"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { UpdateTask, updateTask } from "@/axios/tasks";
import { Check } from "lucide-react";

export default function CompleteTask({ id }: { id: string }) {
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: (data: UpdateTask) => updateTask(id, data),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["task"] });
    },
  });

  const handleComplete = async () => {
    await mutateAsync({ completed: true });
  };
  return (
    <Button onClick={handleComplete}>
      Complete <Check />
    </Button>
  );
}
