"use client";

import { Edit } from "lucide-react";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import UpdateTaskForm from "../form/UpdateTaskForm";
import { Task } from "@/axios/tasks";

type Props = {
  id: string;
  task: Task;
};

export default function EditTask({ id, task }: Props) {
  return (
    <Dialog>
      <DialogTrigger className="bg-transparent shadow h-9 px-4 py-2 text-neutral-800 border hover:bg-neutral-300 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0">
        <Edit />
      </DialogTrigger>

      <UpdateTaskForm id={id} task={task} />
    </Dialog>
  );
}
