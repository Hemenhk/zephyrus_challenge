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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask, CreateTask } from "@/axios/tasks";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format, parse } from "date-fns";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";

const formSchema = z.object({
  title: z
    .string()
    .min(1, {
      message: "Title cannot be empty.",
    })
    .max(24, { message: "Title can only be maximum 24 characters long" }),
  description: z
    .string()
    .min(1, {
      message: "Description cannot be empty.",
    })
    .max(100, {
      message: "Description can only be maximum 100 characters long",
    }),
  dueDate: z.string().min(1, {
    message: "A due date is required",
  }),
});

export default function CreateTaskForm() {
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: CreateTask) => await createTask(data),
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
    <Card className="border-none shadow-none bg-transparent">
      <CardHeader>
        <CardTitle className="text-xl">Create a new task</CardTitle>
        <CardDescription className="text-xs">
          Fill out the form to create your new task
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Task title" {...field} />
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
                      placeholder="Describe your task"
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
                          field.value
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
          </CardContent>
          <CardFooter>
            <Button type="submit">
              {isPending ? "Submitting..." : "Submit"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
