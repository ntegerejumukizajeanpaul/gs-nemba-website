import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import path from "path";
import { fileURLToPath } from "url";
import uploadRoutes from "./routes/upload.js";
import authRoutes from "./routes/auth.js";
import newsRoutes from "./routes/news.js";
import announcementsRoutes from "./routes/announcements.js";
import galleryRoutes from "./routes/gallery.js";
import contactsRoutes from "./routes/contacts.js";
import admissionsRoutes from "./routes/admissions.js";
import messagesRoutes from "./routes/messages.js";
import schoolInfoRoutes from "./routes/schoolInfo.js";
import timetableRoutes from "./routes/timetable.js";
import { initDb } from "./config/db.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL || true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const limiter = rateLimit({
  windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS || 60000),
  max: Number(process.env.RATE_LIMIT_MAX || 100),
});
app.use(limiter);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/announcements", announcementsRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/contacts", contactsRoutes);
app.use("/api/admissions", admissionsRoutes);
app.use("/api/messages", messagesRoutes);
app.use("/api/school-info", schoolInfoRoutes);
app.use("/api/timetable", timetableRoutes);

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

const port = process.env.PORT || 5000;
initDb()
  .then(() => {
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch((err) => {
    console.error("Failed to initialize DB", err);
    process.exit(1);
  });
