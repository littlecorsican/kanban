import React, { PropsWithChildren } from 'react'
import {Navigate, useLocation} from "react-router-dom"
import { base } from '../constants'

const ProtectedRoute = ({
    redirectPath = '/login',
    children,
  }:{
    redirectPath: string,
    children: JSX.Element
  }) => {

    const credentials = localStorage.getItem('user_credentials')
    if (credentials) {
      const credentials_JSON = JSON.parse(credentials)
      console.log("access_token", credentials_JSON?.access_token)
      fetch(`${base}/api/user/verify`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ access_token: credentials_JSON?.access_token }),
      }).then((response)=>{
        return response.json()
      }).then((response)=>{
        console.log("response", response)
        if (response.success === 0) {
          localStorage.removeItem("user_credentials")
          document.location.href = "/login"
        }
      }).catch((err)=> {
        console.log("err", err)
        localStorage.removeItem("user_credentials")
        document.location.href = "/login"
      })
    } else {
      return <Navigate to={redirectPath} replace />;
    }
  
    return children;
};

export default ProtectedRoute
