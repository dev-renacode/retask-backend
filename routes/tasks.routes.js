import { Router } from "express";
import { TaskController } from "../controller/tasks.controller.js";

export const taskRouter = Router();

taskRouter.get("/", TaskController.getAll);
taskRouter.post("/", TaskController.create);
taskRouter.put("/:id", TaskController.update);
taskRouter.delete("/:id", TaskController.delete);
