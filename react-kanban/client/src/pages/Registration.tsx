import { useRef, useEffect, useState, useContext } from "react";
// import { useNavigate } from "@tanstack/router";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { base } from '../constants'
import { GlobalContext } from "../App";
import { useNavigate } from "react-router-dom";

interface LoginError {
  errors: {
    message: string
  }[]
}

export default function LoginPage() {

  // const navigate = useNavigate();
  const global_context = useContext(GlobalContext)
  const navigate = useNavigate();

  const user_password = useRef<HTMLInputElement>(null);
  const user_repassword = useRef<HTMLInputElement>(null);
  const user_username = useRef<HTMLInputElement>(null);

  const [loginErrorMsg, setLoginErrorMessage] = useState<string>("");

  const {mutate:userRegistration, isPending:isPending} = useMutation({
    mutationFn: async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!user_username.current || !user_password.current || !user_repassword.current) return;
  
      const username: string = user_username.current.value;
      const password: string = user_password.current.value;
      const repassword: string = user_repassword.current.value;
      const authInputSchema = z.object({
        username: z.string().email(),
        password: z.string().min(6),
        repassword: z.string().min(6),
      });
  
      authInputSchema.parse({
        username,
        password,
        repassword
      });

      register(username, password, repassword);
    },
    onError: (error:LoginError) => {
      console.error(error)
      setLoginErrorMessage(error.errors[0].message) 
    },
  })

  const register=async(email:string, password:string, repassword:string)=>{
    global_context.setLoading(true);
    const response = await fetch(`${base}/api/user/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password, repassword: repassword }),
    });
    global_context.setLoading(false);
    if (!response.ok) {
      // pop msg registration fail
      global_context.toast(`Registration fail`)
    } else {
      // pop msg registration success
      global_context.toast("Registration success, redirecting to login page...")
      setTimeout(()=>{
        navigate("/login");
      }, 3000)
    }
    response.json().then((response_JSON)=>{
      global_context.toast(response_JSON?.message)
    })
  }


  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="login-container w-96 p-8">
        <h1 className="text-3xl font-semibold text-center mb-6">
          Kanban Board Registration
        </h1>
        <form onSubmit={(e)=>void userRegistration(e)}>
          <p className="text-red-500">{loginErrorMsg}</p>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 font-semibold"
            >
              Email
            </label>
            <input
              type="email"
              id="username"
              name="username"
              ref={user_username}
              className="w-full border px-4 py-2 rounded-lg focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-semibold"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              ref={user_password}
              className="w-full border px-4 py-2 rounded-lg focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="repassword"
              className="block text-gray-700 font-semibold"
            >
              Password
            </label>
            <input
              type="password"
              id="repassword"
              name="repassword"
              ref={user_repassword}
              className="w-full border px-4 py-2 rounded-lg focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <button 
            type="submit" 
            className={`w-full text-white font-semibold py-2 px-4 rounded-lg ${isPending ? 'bg-gray-600' : 'bg-blue-600 hover:bg-blue-700'}`}
            disabled={isPending}
          >Register</button>
        </form>
      </div>
    </div>
  );
};
