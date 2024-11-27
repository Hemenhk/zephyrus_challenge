"use client";

import { getAllTasks } from "@/axios/tasks";
import { AppSidebar } from "@/components/sidebar/AppSidebar";

import { Separator } from "@/components/ui/separator";
import MoonLoader from "react-spinners/MoonLoader"
import {
  SidebarInset,
  SidebarProvider as SideB,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import TaskCard from "../tasks/TaskCard";
import axios from "axios";

export default function SidebarProvider() {
  const {
    data: taskData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["task"],
    queryFn: getAllTasks,
  });

  const completedTasks = taskData?.filter((task) => task.completed);
  const notCompletedTasks = taskData?.filter((task) => !task.completed);

  const tabTriggers = [
    { value: "all", name: "All" },
    { value: "completed", name: "Completed" },
    { value: "not_completed", name: "Not Completed" },
  ];

  const tabContents = [
    { value: "all", tasks: taskData },
    { value: "completed", tasks: completedTasks },
    { value: "not_completed", tasks: notCompletedTasks },
  ];

  if (isLoading) {
    return <MoonLoader />
  }

  if (isError) {
    console.error("Error details:", error);

    let errorMessage = "An unknown error occurred.";
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || error.message || "Request failed.";
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    return (
      <div className="text-red-500 bg-red-100 p-4 rounded-md">
        <h2 className="font-bold">An error occurred:</h2>
        <p>{errorMessage}</p>
      </div>
    );
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
        <div className="flex flex-1 flex-col gap-4 p-4">
          <Tabs defaultValue="all">
            <TabsList>
              {tabTriggers.map((trigger) => (
                <TabsTrigger
                  key={trigger.value}
                  value={trigger.value}
                  className="w-full"
                >
                  {trigger.name}
                </TabsTrigger>
              ))}
            </TabsList>
            {tabContents.map((tab) => (
              <TabsContent key={tab.value} value={tab.value}>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-1 mt-5">
                  {tab.tasks?.map((task) => (
                    <TaskCard key={task._id} task={task} />
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </SidebarInset>
    </SideB>
  );
}
