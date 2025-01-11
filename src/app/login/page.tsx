"use client"
import { googleLogin, login } from "@/redux/slices/userSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { SignupFormData } from "@/redux/types";
import { useGoogleLogin } from "@react-oauth/google";
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toast, Toaster } from "sonner";

export default function LoginPage() {

  const dispatch = useDispatch<AppDispatch>();

  interface GoogleLoginResult {
    code?: string; // The authorization code (present when login is successful)
    error?: string; // Error message (present when login fails)
    [key: string]: unknown; // Include other potential dynamic properties if necessary
  }

  const { inprogressLogin, Loginerror  } = useSelector((state: RootState) => state.user);


  const [formData, setFormData] = useState<SignupFormData>({
    email: "",
    password: "",
  });




  const handleonchange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlesubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
     
      const result =  await dispatch(login(formData));
      if(result.type == 'user/login/fulfilled' ){
        toast.success('login successfull')
        setFormData(() => ({ name: "", email: "", password: "" }));
        window.location.href = "/"
        }
      
    }
    

  

    const responseGoogle = async (result:GoogleLoginResult) => {
      try {

        if(result['code']){
         const res = await dispatch(googleLogin(result['code']))
         if(res.type == 'user/googleLogin/fulfilled'){
          toast.success('login successfull');
          window.location.href = '/'

        }
      }
      } catch (error) {
        console.error("errror while requesting to google",error)
      }
    }

    const handleGoogleLogin = useGoogleLogin({
      onSuccess:responseGoogle,
      onError:responseGoogle,
      flow:'auth-code'

    
    })

    

 
  


  return (

    <section className="px-2 md:px-32 flex flex-col items-center min-h-screen justify-center bg-gray-50">
      <Toaster />
      <div className="w-full max-w-sm border rounded-2xl px-6 py-8 bg-white shadow-lg">
        <h1 className="font-extrabold text-4xl text-center mb-4">LOGIN</h1>
        <form className="space-y-6" onSubmit={handlesubmit}>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-semibold text-gray-600 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              onChange={handleonchange}
              name="email"
              className="border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm font-semibold text-gray-600 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              onChange={handleonchange}
              name="password"
              className="border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
              required
            />
          </div>

            {/* show errr */}
          {
      Loginerror && (
        <div
        className={`flex  flex-col justify-center bg-red-300 items-center border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary
        
      `}>
        <label
         
          className="text-sm font-semibold text-red-600"
        >
        {Loginerror}
        </label>
      </div>
      )
    }

<button className="w-full bg-black text-white text-lg font-bold py-3 rounded-full  transition">
           {inprogressLogin ? "Logging in..." : "Log In"} 
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-gray-500 font-medium hover:underline">
            Register
          </Link>
        </p>

        <div className="flex items-center my-4">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="px-2 text-sm text-gray-400">OR</span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>

        <button className="w-full flex items-center justify-center gap-3 bg-secondary text-black font-medium py-2 rounded-full border border-gray-500 hover:bg-gray-100 transition"
        onClick={handleGoogleLogin}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            width="24"
            height="24"
          >
            <path
              fill="#FFC107"
              d="M43.611,20.083H42V20H24v8h11.314C33.903,32.871,29.503,36,24,36c-6.627,0-12-5.373-12-12 s5.373-12,12-12c3.066,0,5.857,1.152,8,3.042l5.657-5.657C34.074,6.432,29.294,4,24,4C12.954,4,4,12.954,4,24s8.954,20,20,20 c10.267,0,19.206-7.544,20-18.083C44,21.194,43.818,20.62,43.611,20.083z"
            />
            <path
              fill="#FF3D00"
              d="M6.305,14.691l6.572,4.819C14.703,16.158,19.071,14,24,14c3.066,0,5.857,1.152,8,3.042l5.657-5.657 C34.074,6.432,29.294,4,24,4C15.999,4,9.024,8.943,6.305,14.691z"
            />
            <path
              fill="#4CAF50"
              d="M24,44c5.342,0,10.191-2.049,13.91-5.385l-6.288-5.385C29.486,34.871,26.843,36,24,36 c-5.464,0-10.064-3.553-11.764-8.451l-6.536,5.032C9.273,39.3,16.187,44,24,44z"
            />
            <path
              fill="#1976D2"
              d="M43.611,20.083H42V20H24v8h11.314c-1.161,3.379-3.45,5.913-6.692,7.532c0.001-0.001,0.001-0.001,0.001-0.001 l6.288,5.385c-0.441,0.309,6.997-4.661,8.278-13.333C44,21.194,43.818,20.62,43.611,20.083z"
            />
          </svg>
          Continue with Google
        </button>
      </div>
    </section>
  );
}
