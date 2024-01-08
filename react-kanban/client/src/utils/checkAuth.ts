import { useNavigate, useLocation } from "react-router-dom";

export const checkAuth=()=>{
    const location = useLocation();  
    console.log(location.pathname);
    const access_token = localStorage.getItem("access_token")
    
    if (!access_token) {
      document.location.href = "/login"
    }
}