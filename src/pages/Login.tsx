import { useState } from "react";
import { useUserData } from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const navigate=useNavigate();
    const {loginuser,btnloading}=useUserData();
    async function handlesubmit(e:any){
      e.preventDefault();
      loginuser(email,password,navigate)

    }
  return (
    <div className="flex items-center justify-center h-screen max-h-screen">
        <div className="bg-black text-white p-8 rounde-lg shadow-lg max-w-md w-full">
            <h2 className="text-3xl font-semibold text-center mb-8">
                Login to Spotify
            </h2>
            <form onSubmit={handlesubmit} className="mt-8">
               <div className="mb-4">
                <label htmlFor="" className="block text-sm font-medium mb-1">Email or UserName</label>
                <input type="email" placeholder="Email or UserName"  className="auth-input" required value={email} onChange={(e)=>setEmail(e.target.value)}/>

               </div>
               <div className="mb-4">
                <label htmlFor="" className="block text-sm font-medium mb-1">Password</label>
                <input type="password" placeholder="Password"  className="auth-input" required value={password} onChange={(e)=>setPassword(e.target.value)}/>
               </div>
               <button disabled={btnloading} className="auth-btn">{btnloading?"please wait ...":"login"}</button>
            </form>
            <div className="text-center mt-6">
              <Link to={"/register"} className="text-sm text-gray-400 hover:text-gray-300">
              Don't have an Account?
              </Link>
            </div>
        </div>
      login
    </div>
  )
}

export default Login
