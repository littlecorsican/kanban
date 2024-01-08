import { useRef, useEffect, useState, createContext, useContext  } from "react";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { BrowserRouter, Routes, Route  } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import Task from "./pages/Task";
import Projects from "./pages/Projects";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Project from "./pages/Project";
import { Oval } from "react-loader-spinner";
import { boolean } from "zod";
import ProtectedRoute from './components/ProtectedRoute'

const queryClient = new QueryClient();
export type GlobalContent = {
  loading: boolean,
  setLoading:(c: boolean) => void
}
export const GlobalContext = createContext<GlobalContent>({
  loading: false,
  setLoading: () => {},
});

export default function App() {

  const [loading, setLoading] = useState<boolean>(false)

  const user = null


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
              <Route index element={
                <ProtectedRoute user={user} redirectPath="/login">
                  <Home />
                </ProtectedRoute>}  />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Registration />} />
              <Route path="projects" element={
                <ProtectedRoute user={user} redirectPath="/login">
                  <Projects />
                </ProtectedRoute>} 
              />
              <Route path="project/:id" element={<Project />} />
              <Route path="task/:id" element={<Task />} />
              <Route path="*" element={<NoPage />} />
            </Route>
            {/* <Route path="login" element={<Login />} />
            <Route path="register" element={<Registration />} /> */}
          </Routes>
        </QueryClientProvider>
      </GlobalContext.Provider>
    </BrowserRouter>
    
  );
};
