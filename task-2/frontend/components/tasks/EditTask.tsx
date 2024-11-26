"use client";

import { Edit } from "lucide-react";
import { Button } from "../ui/button";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import UpdateTaskForm from "../form/UpdateTaskForm";
import { Task } from "@/axios/tasks";

type Props = {
  id: string;
  task: Task;
};

export default function EditTask({ id, task }: Props) {
  return (
    <Dialog>
      <DialogTrigger>
        <Button className="bg-transparent text-neutral-800 border hover:bg-neutral-300">
          <Edit />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <UpdateTaskForm id={id} task={task} />
      </DialogContent>
    </Dialog>
  );
}
