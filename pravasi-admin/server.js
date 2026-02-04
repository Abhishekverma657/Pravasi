import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import process from "process";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ---- Health Check (EB ke liye MUST) ----
app.get("/health", (_, res) => {
  res.status(200).send("OK");
});

// ---- Static files serve (assets, css, js, etc) ----
app.use(express.static(path.join(__dirname, "dist")));

// ---- Root ----
app.get("/", (_, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// ---- SPA fallback (React / Vite routing) - ALL OTHER ROUTES ----
app.use((_, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// ---- EB Port ----
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Frontend running on port ${PORT}`));