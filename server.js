import app from "./src/app.js";
import dotenv from "dotenv";
import { connectDb, disconnectDb } from "./src/config/db.js";

dotenv.config();

connectDb();

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

// measures inplace to prevent data loss when code breaks:
// Handle unhandled promise rejections (e.g... database connections error)
process.on("unhandledRejection", (err) => {
  console.log("Unhandled Rejection:", err);
  server.close(async () => {
    await disconnectDb();
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on("uncaughtException", async (err) => {
  console.log("Uncaught Exception:", err);
  await disconnectDb();
  process.exit(1);
});

// Graceful shutdown
process.on("SIGTERM", async () => {
  console.log("SIGTERM received, shuttiing down gracefully");
  server.close(async () => {
    await disconnectDb();
    process.exit(1);
  });
});
