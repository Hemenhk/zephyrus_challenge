"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { deleteTask } from "@/axios/tasks";
import { Trash } from "lucide-react";

export default function DeleteTask({ id }: { id: string }) {
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: (id: string) => deleteTask(id),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["task"] });
    },
  });

  return (
    <Button
      onClick={() => mutateAsync(id)}
      className="bg-transparent text-neutral-800 border hover:bg-neutral-300"
    >
      <Trash />
    </Button>
  );
}
