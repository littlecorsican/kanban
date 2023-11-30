import { useRef, useEffect, useState } from "react";
// import { useNavigate } from "@tanstack/router";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { base } from '../constants'

interface LoginError {
  errors: {
    message: string
  }[]
}

export default function LoginPage() {

  // const navigate = useNavigate();

  const user_password = useRef<HTMLInputElement>(null);
  const user_repassword = useRef<HTMLInputElement>(null);
  const user_username = useRef<HTMLInputElement>(null);

  const [loginErrorMsg, setLoginErrorMessage] = useState<string>("");

//   useEffect(() => {
//     // If already logged in , redirect to /
//     if (isLoggedIn) {
//       void navigate({
//         to: "/",
//         replace: true,
//       });
//     }
//   }, [isLoggedIn, navigate]);


  const {mutate:userRegistration, isPending:isPending} = useMutation({
    mutationFn: async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!user_username.current || !user_password.current || !user_repassword.current) return;
  
      const email: string = user_username.current.value;
      const password: string = user_password.current.value;
      const repassword: string = user_repassword.current.value;
  
      const authInputSchema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
        repassword: z.string().min(6),
      });
  
      authInputSchema.parse({
        email,
        password,
      });

      return await register(email, password, repassword);
    },
    onError: (error:LoginError) => {
      console.error(error)
      setLoginErrorMessage(error.errors[0].message) 
    },
  })

  const register=async(email:string, password:string, repassword:string)=>{
    const response = await fetch(`${base}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password, repassword: repassword }),
    });
    if (!response.ok) {
        return {
            success: false,
            message: "error"
        }
    }
    return {
        success: true,
        message: response.json()
    }

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
          >Login</button>
        </form>
      </div>
    </div>
  );
};
