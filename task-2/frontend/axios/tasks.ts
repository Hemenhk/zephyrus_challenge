import axios from "axios";

const API_URL = "http://localhost:5000/api";

export type Task = {
  title: string;
  description: string;
  dueDate: Date;
  _id: string;
  completed: boolean;
  createdAt: string;
};

export type AllTasks = {
  data: Task[];
};

export type CreateTask = {
  title: string;
  description: string;
  dueDate: Date;
};

export type UpdateTask = {
  title?: string;
  description?: string;
  dueDate?: Date;
  completed?: boolean;
};

export const getAllTasks = async () => {
  try {
    const res = await axios.get<AllTasks>(`${API_URL}/tasks`);
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const createTask = async (data: CreateTask) => {
  try {
    const res = await axios.post(`${API_URL}/tasks`, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateTask = async (id: string, data: UpdateTask) => {
  try {
    const res = await axios.put(`${API_URL}/tasks/${id}`, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteTask = async (id: string) => {
  try {
    const res = await axios.delete(`${API_URL}/tasks/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
