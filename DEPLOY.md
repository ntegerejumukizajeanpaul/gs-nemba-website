# Deployment guide

## Frontend (Vercel)

- Set `VITE_API_URL` to your backend public URL (e.g., https://api-yourapp.onrender.com/api)
- Build: `npm run build`
- Vercel will automatically detect Vite and build using `npm run build`.

Optimizations:
- Use Vercel's Image Optimization for remote images where possible.
- Ensure `og-image.png` is placed in `public/`.

## Backend (Render / Railway)

- Use the provided `backend` folder and set environment variables using the platform UI:
  - `PORT`, `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `JWT_SECRET`, `UPLOAD_DIR`
- Ensure persistent storage for `uploads/` or integrate S3 and adjust the upload route to save to S3.
- Start command: `npm start` (or `npm run dev` for development)

Notes:
- Enable TLS and proper domain configuration
- Use managed MySQL for production
- Set `NODE_ENV=production` and ensure `JWT_SECRET` is strong
- Set up backups for the database

## SEO & sitemap
- Generate a sitemap with your deployment process to include website pages. Add `sitemap.xml` to `public/` for the frontend.
- Add a `robots.txt` file to `public/`.

## Additional
- Set up monitoring and error tracking (Sentry)
- Configure CORS origin to match frontend domain
