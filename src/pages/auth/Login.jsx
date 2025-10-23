import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200/50">
      <div className="card w-full max-w-md shadow-lg bg-base-300 rounded-lg p-6 space-y-8">
        <h2 className="text-2xl font-semibold text-center text-base-content">
          Login
        </h2>
        <form className="space-y-4">
          <div>
            <label
              htmlFor="login-email"
              className="block text-sm font-medium text-base-content"
            >
              Email
            </label>
            <input
              type="email"
              id="login-email"
              className="input input-bordered w-full"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label
              htmlFor="login-password"
              className="block text-sm font-medium text-base-content"
            >
              Password
            </label>
            <input
              type="password"
              id="login-password"
              className="input input-bordered w-full"
              placeholder="Enter your password"
              required
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
