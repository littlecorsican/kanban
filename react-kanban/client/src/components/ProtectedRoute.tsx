import React, { PropsWithChildren } from 'react'
import {Navigate, useLocation} from "react-router-dom"

const ProtectedRoute = ({
    user,
    redirectPath = '/login',
    children,
  }:{
    user: unknown,
    redirectPath: string,
    children: JSX.Element
  }) => {
    console.log("user", user)
    if (!user) {
      return <Navigate to={redirectPath} replace />;
    }
  
    return children;
};

export default ProtectedRoute
