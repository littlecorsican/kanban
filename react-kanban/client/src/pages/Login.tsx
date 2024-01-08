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

  const global_context = useContext(GlobalContext)

  const user_password = useRef<HTMLInputElement>(null);
  const user_username = useRef<HTMLInputElement>(null);

  const [loginErrorMsg, setLoginErrorMessage] = useState<string>("");
  
  const navigate = useNavigate();

  const {mutate:userLogin, isPending:isPending} = useMutation({
    mutationFn: async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!user_username.current || !user_password.current) return;
  
      const email: string = user_username.current.value;
      const password: string = user_password.current.value;
  
      const authInputSchema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
      });
  
      authInputSchema.parse({
        email,
        password,
      });

      await login(email, password);
    },
    onError: (error:LoginError) => {
      console.error(error)
      setLoginErrorMessage(error.errors[0].message) 
    },
  })

  const login=async(email:string, password:string)=>{
    global_context.setLoading(true);
    const response = await fetch(`${base}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password }),
    });
    global_context.setLoading(false);
    console.log('response', response)
    const response2 = await response.json()
    console.log('response2', response2)
    if (!response.ok) {
        return {
          success: false,
          message: "error"
        }
    }

    // LOGIN SUCCESS
    // ADD ACCESS TOKEN TO LOCAL STORAGE
    const access_token = response2.access_token
    global_context.setUser({
      access_token: access_token
    })
    global_context.toast("Login success")
    navigate("/");

  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="login-container w-96 p-8">
        <h1 className="text-3xl font-semibold text-center mb-6">
          Kanban Board Login
        </h1>
        <form onSubmit={(e)=>void userLogin(e)}>
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
          <button 
            type="submit" 
            className={`w-full text-white font-semibold py-2 px-4 rounded-lg ${isPending ? 'bg-gray-600' : 'bg-blue-600 hover:bg-blue-700'}`}
            disabled={isPending}
          >Login</button>
        </form>
      </div>
    </div>
  );
};
