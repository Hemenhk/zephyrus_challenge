"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDebounce } from "@/hooks/useDebounce";
import { postOptions } from "@/lib/postOptions";
import { Skeleton } from "../ui/skeleton";

export default function Posts() {
  const [titleFilter, setTitleFilter] = useState("");
  const [idFilter, setIdFilter] = useState("");

  const debouncedTitle = useDebounce(titleFilter, 500);
  const debouncedId = useDebounce(idFilter, 500);

  const { data: posts, isLoading } = useSuspenseQuery(postOptions);

  const filteredPosts = posts?.filter((post) => {
    const matchesTitle = post.title
      .toLowerCase()
      .includes(debouncedTitle.toLowerCase());
    const matchesId = debouncedId ? post.id === Number(debouncedId) : true;
    return matchesTitle && matchesId;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-row gap-4">
        <Input
          className="w-full"
          placeholder="Filter by title..."
          value={titleFilter}
          onChange={(e) => setTitleFilter(e.target.value)}
        />
        <Input
          className="w-full"
          placeholder="Filter by ID..."
          type="number"
          value={idFilter}
          onChange={(e) => setIdFilter(e.target.value)}
        />
        <Button onClick={() => setTitleFilter("")}>Clear Title</Button>
        <Button onClick={() => setIdFilter("")}>Clear ID</Button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 9 }).map((_, index) => (
            <Card key={index}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/3" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-5/6 mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts?.map((post) => (
            <Card key={post.id}>
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>Post ID: {post.id}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{post.body}</p>
              </CardContent>
            </Card>
          ))}
          {!filteredPosts?.length && <p>No posts match the current filters.</p>}
        </div>
      )}
    </div>
  );
}
