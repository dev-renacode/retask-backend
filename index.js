import express from "express";
import { PORT } from "./config.js";
import morgan from "morgan";
import tasks from "./db/tasks.js";
import connectDB from "./db/db.js";

connectDB();

const app = express();
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({ message: "Hello world" });
});

// GET ALL TASKS
app.get("/api/tasks", async (req, res) => {
  const task = await tasks.find();
  return res.status(200).json(task);
});

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`);
});
