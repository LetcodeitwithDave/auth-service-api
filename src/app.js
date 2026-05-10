import express from "express";
import authRoute from "./routes/authRoute.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ROUTES
app.use("/api/auth", authRoute);

export default app;
