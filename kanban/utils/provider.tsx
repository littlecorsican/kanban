"use client";

import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { PropsWithChildren } from "react";

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError(error) {
      // TODO: Handle Authentication issue
      if (error instanceof Error) {
        console.error("Error in query", error.message);
      }
    },
  }),
});

function ReactQueryProvider(props: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      {props.children}
    </QueryClientProvider>
  );
}

export default ReactQueryProvider;