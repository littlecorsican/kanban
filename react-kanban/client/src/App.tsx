import { useRef, useEffect, useState } from "react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from 'react-query';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import Task from "./pages/Task";
import Projects from "./pages/Projects";
import Project from "./pages/Project";
const queryClient = new QueryClient();

export default function App() {

  

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="projects" element={<Projects />} />
          <Route path="project/:id" element={<Project />} />
          <Route path="task/:id" element={<Task />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes></QueryClientProvider>
    </BrowserRouter>
    
  );
};
