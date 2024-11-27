"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Task, updateTask, UpdateTask } from "@/axios/tasks";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format, isValid, parse } from "date-fns";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "../ui/dialog";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title cannot be empty.",
  }),
  description: z.string().min(1, {
    message: "Description cannot be empty.",
  }),
  dueDate: z.string().min(1, {
    message: "A due date is required",
  }),
});

type Props = {
  id: string;
  task: Task;
};

export default function UpdateTaskForm({ id, task }: Props) {
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: task?.title || "",
      description: task?.description || "",
      dueDate: task?.dueDate ? format(task.dueDate, "MM/dd/yyyy") : "",
    },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: UpdateTask) => await updateTask(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["task"] });
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const formattedData = {
        ...values,
        dueDate: parse(values.dueDate, "MM/dd/yyyy", new Date()),
      };
      console.log(formattedData);

      const res = await mutateAsync(formattedData);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    // <Card className="border-none shadow-none bg-transparent">
    <DialogContent>
      <DialogTitle>Update your task</DialogTitle>
      <DialogDescription>Edit the form to update your task</DialogDescription>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* <CardContent className="space-y-8"> */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Wash dishes" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write down how you will complete this task"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dueDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Due date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={
                        field.value &&
                        isValid(parse(field.value, "MM/dd/yyyy", new Date()))
                          ? parse(field.value, "MM/dd/yyyy", new Date())
                          : undefined
                      }
                      onSelect={(date) =>
                        field.onChange(date ? format(date, "MM/dd/yyyy") : "")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                <FormMessage />
              </FormItem>
            )}
          />
          {/* </CardContent> */}
          <DialogFooter>
            <Button type="submit">{isPending ? "Saving..." : "Save"}</Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>

    // </Card>
  );
}
