import fs from "fs";
import path from "path";
import mysql from "mysql2/promise";
import BetterSqlite3 from "better-sqlite3";
import dotenv from "dotenv";

dotenv.config();
let pool;
const DB_ENGINE = process.env.DB_ENGINE?.toLowerCase() || "sqlite";
const isSqlite = DB_ENGINE === "sqlite";

export async function initDb() {
  if (isSqlite) {
    const dbFile = process.env.DB_FILE || "./data/gs_nemba.sqlite";
    const dbPath = path.resolve(dbFile);
    const dbDir = path.dirname(dbPath);

    if (!fs.existsSync(dbDir)) {
      fs.mkdirSync(dbDir, { recursive: true });
    }

    const db = new BetterSqlite3(dbPath);
    db.pragma("journal_mode = WAL");

    pool = {
      async query(sql, params = []) {
        const stmt = db.prepare(sql);
        const normalizedParams = Array.isArray(params) ? params : [params];
        const normalizedSql = sql.trim().toUpperCase();

        if (normalizedSql.startsWith("SELECT")) {
          const rows = stmt.all(...normalizedParams);
          return [rows, []];
        }

        const info = stmt.run(...normalizedParams);
        return [
          {
            insertId: info.lastInsertRowid ?? info.lastID,
            affectedRows: info.changes,
          },
          [],
        ];
      },
      async getConnection() {
        return {
          query: async (sql, params = []) => pool.query(sql, params),
          release: () => {},
        };
      },
    };
  } else {
    pool = mysql.createPool({
      host: process.env.DB_HOST || "127.0.0.1",
      port: Number(process.env.DB_PORT) || 3306,
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "",
      database: process.env.DB_NAME || "gs_nemba",
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }

  await createTables();
}

export function getPool() {
  if (!pool) throw new Error("DB not initialized");
  return pool;
}

async function createTables() {
  const conn = isSqlite ? pool : await pool.getConnection();
  try {
    await conn.query(`
      CREATE TABLE IF NOT EXISTS admins (
        id ${isSqlite ? "INTEGER PRIMARY KEY AUTOINCREMENT" : "INT AUTO_INCREMENT PRIMARY KEY"},
        name VARCHAR(255),
        email VARCHAR(255) UNIQUE,
        password VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )${isSqlite ? "" : " ENGINE=InnoDB"};
    `);

    await conn.query(`
      CREATE TABLE IF NOT EXISTS announcements (
        id ${isSqlite ? "INTEGER PRIMARY KEY AUTOINCREMENT" : "INT AUTO_INCREMENT PRIMARY KEY"},
        title VARCHAR(255) NOT NULL,
        summary TEXT,
        type VARCHAR(50) DEFAULT 'announcement',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )${isSqlite ? "" : " ENGINE=InnoDB"};
    `);

    await conn.query(`
      CREATE TABLE IF NOT EXISTS news (
        id ${isSqlite ? "INTEGER PRIMARY KEY AUTOINCREMENT" : "INT AUTO_INCREMENT PRIMARY KEY"},
        title VARCHAR(255) NOT NULL,
        excerpt TEXT,
        body TEXT,
        category VARCHAR(255),
        image VARCHAR(1024),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )${isSqlite ? "" : " ENGINE=InnoDB"};
    `);

    await conn.query(`
      CREATE TABLE IF NOT EXISTS gallery (
        id ${isSqlite ? "INTEGER PRIMARY KEY AUTOINCREMENT" : "INT AUTO_INCREMENT PRIMARY KEY"},
        title VARCHAR(255),
        category VARCHAR(255),
        display_type VARCHAR(50) DEFAULT 'gallery',
        image VARCHAR(1024),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )${isSqlite ? "" : " ENGINE=InnoDB"};
    `);

    await conn.query(`
      CREATE TABLE IF NOT EXISTS contacts (
        id ${isSqlite ? "INTEGER PRIMARY KEY AUTOINCREMENT" : "INT AUTO_INCREMENT PRIMARY KEY"},
        phone VARCHAR(100),
        email VARCHAR(255),
        address TEXT
      )${isSqlite ? "" : " ENGINE=InnoDB"};
    `);

    await conn.query(`
      CREATE TABLE IF NOT EXISTS admissions (
        id ${isSqlite ? "INTEGER PRIMARY KEY AUTOINCREMENT" : "INT AUTO_INCREMENT PRIMARY KEY"},
        requirements TEXT,
        documents TEXT,
        fees TEXT
      )${isSqlite ? "" : " ENGINE=InnoDB"};
    `);

    await conn.query(`
      CREATE TABLE IF NOT EXISTS messages (
        id ${isSqlite ? "INTEGER PRIMARY KEY AUTOINCREMENT" : "INT AUTO_INCREMENT PRIMARY KEY"},
        name VARCHAR(255),
        email VARCHAR(255),
        subject VARCHAR(255),
        message TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )${isSqlite ? "" : " ENGINE=InnoDB"};
    `);

    await conn.query(`
      CREATE TABLE IF NOT EXISTS testimonials (
        id ${isSqlite ? "INTEGER PRIMARY KEY AUTOINCREMENT" : "INT AUTO_INCREMENT PRIMARY KEY"},
        name VARCHAR(255),
        role VARCHAR(255),
        quote TEXT
      )${isSqlite ? "" : " ENGINE=InnoDB"};
    `);

    await conn.query(`
      CREATE TABLE IF NOT EXISTS statistics (
        id ${isSqlite ? "INTEGER PRIMARY KEY AUTOINCREMENT" : "INT AUTO_INCREMENT PRIMARY KEY"},
        key_name VARCHAR(255),
        key_value VARCHAR(255)
      )${isSqlite ? "" : " ENGINE=InnoDB"};
    `);

    await conn.query(`
      CREATE TABLE IF NOT EXISTS timetable (
        id ${isSqlite ? "INTEGER PRIMARY KEY AUTOINCREMENT" : "INT AUTO_INCREMENT PRIMARY KEY"},
        class_key VARCHAR(255) NOT NULL,
        period_key VARCHAR(50) NOT NULL,
        subject VARCHAR(255) NOT NULL,
        teacher VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )${isSqlite ? "" : " ENGINE=InnoDB"};`);
    if (!isSqlite) {
      await ensureColumn(
        conn,
        "announcements",
        "type VARCHAR(50) DEFAULT 'announcement'",
      );
      await ensureColumn(
        conn,
        "gallery",
        "display_type VARCHAR(50) DEFAULT 'gallery'",
      );
    }
  } finally {
    if (!isSqlite) conn.release();
  }
}

async function ensureColumn(conn, table, definition) {
  const columnName = definition.split(" ")[0];
  const [rows] = await conn.query("SHOW COLUMNS FROM ?? LIKE ?", [
    table,
    columnName,
  ]);
  if (rows.length === 0) {
    await conn.query(`ALTER TABLE ?? ADD COLUMN ${definition};`, [table]);
  }
}
