import { useRef, useEffect, useState } from "react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from 'react-query';
const queryClient = new QueryClient();

export default function App() {

  

  return (
    <QueryClientProvider client={queryClient}>
    <div className="">
      This is App
    </div>
    </QueryClientProvider>
  );
};
