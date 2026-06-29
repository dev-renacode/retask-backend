import tasks from "../db/tasks.js";

export class TaskModel {
  static getAll = async () => {
    return await tasks.find();
  };

  static create = async ({ data }) => {
    return await tasks.create(data);
  };

  static update = async ({ id, data }) => {
    const task = await tasks.findByIdAndUpdate(id, data);

    if (!task) return null;

    return task;
  };

  static delete = async ({ id }) => {
    const taskDeleted = await tasks.findByIdAndDelete(id);
    if (!taskDeleted) return null;
    return taskDeleted;
  };
}
