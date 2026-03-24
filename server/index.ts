import express, { Request, Response } from "express";
import cors from "cors";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import authRoutes from "./routes/authRoutes.js";

import sessionRoutes from "./routes/sessionRoutes.js";
import { connectDB } from "./config/db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({ origin: "*", methods: ["GET", "POST", "PUT", "DELETE"] }));
app.use(express.json());

app.use("/api", sessionRoutes);
app.use("/api/auth", authRoutes);

if (process.env.NODE_ENV !== "production") {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "spa",
  });
  app.use(vite.middlewares);
} else {
  const clientDist = join(__dirname, "..", "dist", "client");

  app.use(express.static(clientDist));

  app.get("*", (_req: Request, res: Response) => {
    res.sendFile(join(clientDist, "index.html"));
  });
}

(async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (err: unknown) {
    console.error("Error starting server", err);
  }
})();
