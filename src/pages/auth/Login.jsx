import React, { useState } from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore.js";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { EyeOff } from "lucide-react";
import { Eye } from "lucide-react";
import { Loader2 } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { isLoggingIn, login } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (credientials) => {
    console.log("data", credientials);

    try {
      await login(credientials);
    } catch (error) {
      console.log("Error on login: ", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200/50">
      <div className="card w-full max-w-md shadow-lg bg-base-300 rounded-lg p-6 space-y-8">
        <h2 className="text-2xl font-semibold text-center text-base-content">
          Login
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* Email  */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Email</span>
            </label>
            <div className="relative">
              <input
                type="email"
                {...register("email")}
                className={`input input-bordered w-full ${
                  errors.email ? "input-error" : ""
                }`}
                placeholder="Enter your email"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password  */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Password</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password")}
                className={`input input-bordered w-full ${
                  errors.password ? "input-error" : ""
                }`}
                placeholder="Enter your Password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-base-content/40" />
                ) : (
                  <Eye className="h-5 w-5 text-base-content/40" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="text-center flex flex-col items-center mt-4 gap-2">
            <button disabled={isLoggingIn} type="submit" className="btn btn-primary w-32 max-w-36">
              {isLoggingIn ? <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span className="ml-2">loading...</span>
              </> : "Login"}
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
