import {Task} from "../models/task";
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "./factoryContoller";

export const getAllTasks = getAll(Task);
export const getTask = getOne(Task);
export const createTask = createOne(Task);
export const updateTask = updateOne(Task);
export const deleteTask = deleteOne(Task);
