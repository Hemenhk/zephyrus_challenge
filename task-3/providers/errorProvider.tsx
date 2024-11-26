"use client";

import {
  FallbackProps,
  ErrorBoundary as ReactErrorBoundary,
} from "react-error-boundary";
import { Button } from "@/components/ui/button";
import { TriangleAlert } from "lucide-react";

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div className="p-4 flex flex-col gap-5 justify-center items-center h-screen w-full text-center bg-red-50 text-red-700 rounded-lg">
      <TriangleAlert size={40} />
      <h2 className="font-bold text-2xl">Something went wrong</h2>
      <p>{error.message}</p>
      <Button onClick={resetErrorBoundary} className="mt-2">
        Try Again
      </Button>
    </div>
  );
}

export default function ErrorBoundary({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactErrorBoundary FallbackComponent={ErrorFallback}>
      {children}
    </ReactErrorBoundary>
  );
}
