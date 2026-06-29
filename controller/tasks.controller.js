import { TaskModel } from "../models/tasks.model.js";
import { validateTask, validateTaskPartial } from "../schemas/task.scheme.js";

export class TaskController {
  static getAll = async (req, res) => {
    try {
      const tasks = await TaskModel.getAll();
      return res.status(200).json(tasks);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  };

  static create = async (req, res) => {
    try {
      const { success, data, error } = validateTask(req.body);

      if (error)
        return res.status(400).json({ message: JSON.parse(error.message) });

      const taskCreated = await TaskModel.create({ data });

      res.status(201).json(taskCreated);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  };

  static update = async (req, res) => {
    try {
      const id = req.params.id;
      const { success, data, error } = validateTaskPartial(req.body);

      if (error)
        return res.status(400).json({ message: JSON.parse(error.message) });

      const taskUpdated = await TaskModel.update({ id, data });

      if (!taskUpdated)
        return res.status(404).json({ message: "Task not found" });

      const task = {
        ...taskUpdated._doc,
        ...data,
      };

      return res.status(200).json(task);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  };

  static delete = async (req, res) => {
    const id = req.params.id;

    const taskDeleted = await TaskModel.delete({ id });

    if (!taskDeleted)
      return res.status(404).json({ message: "Task not found" });

    return res.status(200).json({ message: "Task deleted" });
  };
}
