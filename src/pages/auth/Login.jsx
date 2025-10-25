import React, { useState } from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";

const initialState = {
  email: "",
  password: "",
}

const Login = () => {
  const [credientials,setCredientials] = useState(initialState);

  const handleChange = (e) => {
    console.log("event",e.target,e.target.value);
    setCredientials({...credientials,[e.target.id]: e.target.value})
  }

  const handleSubmit = async () => {
    console.log("Login successfully");
    
    setCredientials(initialState);
  }
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200/50">
      <div className="card w-full max-w-md shadow-lg bg-base-300 rounded-lg p-6 space-y-8">
        <h2 className="text-2xl font-semibold text-center text-base-content">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-base-content"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="input input-bordered w-full"
              placeholder="Enter your email"
              onChange={(e) => handleChange(e)}
              value={credientials.email}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-base-content"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="input input-bordered w-full"
              placeholder="Enter your password"
              onChange={(e) => handleChange(e)}
              value={credientials.password}
            />
          </div>
          <div className="text-center flex flex-col items-center mt-4 gap-2">
            <button type="submit" className="btn btn-primary w-32 max-w-36">
              Login
            </button>
            <Link to="/signup" className="text-sm text-base-content">
              Don't have an account? Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
