"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "../ui/badge";
import CompleteTask from "./CompleteTask";
import EditTask from "./EditTask";
import DeleteTask from "./DeleteTask";
import { Task } from "@/axios/tasks";

export default function TaskCard({ task }: { task: Task }) {
  return (
    <Card key={task._id} className="rounded-md max-w-[400px]">
      <CardHeader className="text-xl capitalize flex gap-2 lg:flex-row  justify-between">
        <span>{task.title}</span>
        {task.completed ? (
          <Badge className="text-xs bg-green-600 rounded-full flex justify-center">
            Completed
          </Badge>
        ) : (
          <Badge className="text-xs bg-orange-700 rounded-full flex justify-center">
            Not completed
          </Badge>
        )}
      </CardHeader>

      <CardContent className="space-y-3">
        <p className="flex flex-col text-sm text-gray-700">
          <strong>Description:</strong>
          <span>{task.description}</span>
        </p>
        <p className="flex flex-col text-sm text-gray-700">
          <strong>Due Date:</strong> <span>{task.dueDate.toLocaleString()}</span>
        </p>
      </CardContent>

      <CardFooter className="flex flex-col gap-2 lg:flex-row lg:items-center justify-between">
        {!task.completed && <CompleteTask id={task._id} />}

        <div className="flex flex-row gap-2">
          <EditTask id={task._id} task={task} />
          <DeleteTask id={task._id} />
        </div>
      </CardFooter>
    </Card>
  );
}
