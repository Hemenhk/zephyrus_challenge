"use client";

import { getAllTasks } from "@/axios/tasks";
import { AppSidebar } from "@/components/sidebar/AppSidebar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider as SideB,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useQuery } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { Edit } from "lucide-react";
import { Badge } from "../ui/badge";
import DeleteTask from "../tasks/DeleteTask";
import CompleteTask from "../tasks/CompleteTask";
import EditTask from "../tasks/EditTask";

export default function SidebarProvider() {
  const {
    data: taskData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["task"],
    queryFn: getAllTasks,
  });

  console.log(taskData);

  if (isLoading) {
    return <p>Loading tasks...</p>;
  }

  if (isError) {
    return <p>Error</p>;
  }

  return (
    <SideB>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <h4>All tasks</h4>
        </header>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
          {taskData?.map((task) => (
            <Card key={task._id} className="rounded-md">
              <CardHeader className="text-xl capitalize flex gap-2 lg:flex-row items-center justify-between">
                <span>{task.title}</span>
                {task.completed ? (
                  <Badge className="text-xs bg-green-600 rounded-full">
                    Completed
                  </Badge>
                ) : (
                  <Badge className="text-xs bg-orange-700 rounded-full">
                    Not completed
                  </Badge>
                )}
              </CardHeader>

              <CardContent>
                <p className="text-sm text-gray-700">
                  <strong>Description:</strong> {task.description}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Due Date:</strong> {task.dueDate}
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
          ))}
        </div>
      </SidebarInset>
    </SideB>
  );
}
