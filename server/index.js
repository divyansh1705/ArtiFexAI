import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './mongodb/connect.js';
import dalleRoutes from './routes/dalleRoutes.js'
import postRoutes from './routes/postRoutes.js'
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config()

const app=express();
app.use(cors());
app.use(express.json({ limit: "50mb" })); // Increase JSON payload size
app.use(express.urlencoded({ limit: "50mb", extended: true })); // Increase form data size

app.use('/api/v1/dalle',dalleRoutes)
app.use('/api/v1/post',postRoutes)

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
  });
}


const startServer = async () => {
    try {
      connectDB(process.env.MONGODB_URL);
  
      const PORT = process.env.PORT || 3000;
      app.listen(PORT, () => {
        console.log(`Server started on http://localhost:${PORT}`);
      });
    } catch (error) {
      console.error(`Failed to start server: ${error.message}`);
      process.exit(1); 
    }
  };
  
  startServer();
