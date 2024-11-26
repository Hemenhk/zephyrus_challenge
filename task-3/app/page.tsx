import Posts from "@/components/posts/Posts";
import { postOptions } from "@/lib/postOptions";
import ErrorBoundary from "@/providers/errorProvider";
import { getQueryClient } from "@/providers/getClient";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

export default function Home() {
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(postOptions);
  return (
    <main className="m-24">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ErrorBoundary>
          <Posts />
        </ErrorBoundary>
      </HydrationBoundary>
    </main>
  );
}
