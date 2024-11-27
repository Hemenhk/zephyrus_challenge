import mongoose, { Document, model, Schema } from "mongoose";

// Task interface with createdAt, title, description, completed, and dueDate fields
interface ITask extends Document {
  createdAt: string;
  title: string;
  description: string;
  completed: boolean;
  dueDate: Date;
}

const formatDateToUS = (date: string | Date): string => {
  const parsedDate = new Date(date);
  const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
  const day = String(parsedDate.getDate()).padStart(2, "0");
  const year = parsedDate.getFullYear();
  return `${month}/${day}/${year}`;
};

// Task schema
const taskSchema: Schema = new Schema(
  {
    createdAt: {
      type: String,
      default: () => {
        const currentDate = new Date();
        return formatDateToUS(currentDate);
      },
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    dueDate: {
      type: Date,
      required: true,
    },
  },
  {
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        if (ret.createdAt) {
          ret.createdAt = formatDateToUS(ret.createdAt);
        }
        if (ret.dueDate) {
          ret.dueDate = formatDateToUS(ret.dueDate);
        }
        return ret;
      },
    },
    toObject: { virtuals: true },
  }
);

// Model
export const Task = model<ITask>("Task", taskSchema);
