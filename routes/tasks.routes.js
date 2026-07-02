import { Router } from "express";
import { TaskController } from "../controllers/tasks.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

export const taskRouter = Router();

taskRouter.get("/", authMiddleware, TaskController.getAll);
taskRouter.post("/", authMiddleware, TaskController.create);
taskRouter.put("/:id", authMiddleware, TaskController.update);
taskRouter.delete("/:id", authMiddleware, TaskController.delete);
