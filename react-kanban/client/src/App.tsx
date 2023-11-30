import { useRef, useEffect, useState, createContext, useContext  } from "react";
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
import { Oval } from "react-loader-spinner";
import { boolean } from "zod";

const queryClient = new QueryClient();
export type GlobalContent = {
  loading: boolean,
  setLoading:(c: boolean) => void
}
const GlobalContext = createContext<GlobalContent>({
  loading: false,
  setLoading: () => {},
});


export default function App() {

  const [loading, setLoading] = useState<boolean>(false)

  return (
    <BrowserRouter>
      <Oval
        height={80}
        width={80}
        color="#4fa94d"
        wrapperStyle={{}}
        wrapperClass="justify-center z-50 m-auto fixed w-full h-full items-center"
        visible={loading}
        ariaLabel="oval-loading"
        secondaryColor="#4fa94d"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
      <GlobalContext.Provider value={{
        loading,
        setLoading,
      }}>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="projects" element={<Projects />} />
              <Route path="project/:id" element={<Project />} />
              <Route path="task/:id" element={<Task />} />
              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
        </QueryClientProvider>
      </GlobalContext.Provider>
    </BrowserRouter>
    
  );
};
