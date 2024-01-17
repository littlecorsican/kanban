import { useContext, useEffect, useState } from "react";
import { request } from '../utils/helpers'
import { GlobalContext } from "../App";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import { base } from '../constants'

export default function Home() {

  const global_context = useContext(GlobalContext)
  const { data:dashboardStats, isError:isDashboardStatsError, error:dashBoardStatsError, isLoading:isDashboardStatsLoading } = useQuery({ 
    queryKey: ['dashboardStats'],
    queryFn: async() => {
        global_context.setLoading(true)
        const res:any = await request(`${base}/api/project/dashboard`, "GET", )
        global_context.setLoading(false)
        return res?.data
    }
  });

  const { data:taskStats, isError:isTaskStatsError, error:taskStatsError, isLoading:isTaskStatsLoading } = useQuery({ 
    queryKey: ['taskStats'],
    queryFn: async() => {
        global_context.setLoading(true)
        const res:any = await request(`${base}/api/task/dashboard`, "GET", )
        global_context.setLoading(false)
        return res?.data
    }
  });

  return (
    <div className="p-24">
        <h2 className="mx-4 my-8 text-xl font-bold"><u>Dashboard</u></h2>
        {
          dashboardStats && <h3>Amount of projects: {dashboardStats} </h3> 
        }
        {
          taskStats && <h3>Amount of tasks: {taskStats} </h3> 
        }
    </div>
  );
};
