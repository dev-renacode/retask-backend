import express from "express";
import morgan from "morgan";
import connectDB from "./db/db.js";

import { PORT } from "./config.js";
import { taskRouter } from "./routes/tasks.routes.js";

connectDB();

const app = express();
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/tasks", taskRouter);

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`);
});
