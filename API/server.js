import app, { __dirname } from "./app.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config({ path: `${__dirname}/config.env` });

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.DATA_BASE)
  .then(() => {
    console.log("✅ Database connected successfully (RokadCollage)");

    app.listen(PORT, () => {
      console.log(`🚀 Rokad Collage API is running on port ${PORT}`);
      console.log(`📑 Swagger Documentation: http://localhost:${PORT}/api-docs`);
    });
  })
  .catch((error) => {
    console.error("❌ Database connection failed:", error.message);
  });
