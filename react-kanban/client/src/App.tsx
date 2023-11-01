import { useRef, useEffect, useState } from "react";
// import { useNavigate } from "@tanstack/router";
// import { z } from "zod";
import { useMutation } from "@tanstack/react-query";

interface LoginError {
  errors: {
    message: string
  }[]
}

export default function LoginPage() {

  // const navigate = useNavigate();

  const user_password = useRef<HTMLInputElement>(null);
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


  const {mutate:userLogin, isLoading} = useMutation({
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

      return await login(email, password);
    },
    onError: (error:LoginError) => {
      console.error(error)
      setLoginErrorMessage(error.errors[0].message) 
    },
  })


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
            className={`w-full text-white font-semibold py-2 px-4 rounded-lg ${isLoading ? 'bg-gray-600' : 'bg-blue-600 hover:bg-blue-700'}`}
            disabled={isLoading}
          >Login</button>
        </form>
      </div>
    </div>
  );
};
