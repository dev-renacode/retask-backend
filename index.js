import express from "express";
import morgan from "morgan";
import connectDB from "./db/db.js";

import { PORT } from "./config.js";
import { taskRouter } from "./routes/tasks.routes.js";
import { authRouter } from "./routes/auth.routes.js";

connectDB();

const app = express();
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/tasks", taskRouter);
app.use("/api/auth", authRouter);

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`);
});
