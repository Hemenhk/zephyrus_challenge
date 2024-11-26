import { getPosts } from "@/axios/posts";
import { queryOptions } from "@tanstack/react-query";

export const postOptions = queryOptions({
  queryKey: ["postss"],
  queryFn: getPosts,
});
