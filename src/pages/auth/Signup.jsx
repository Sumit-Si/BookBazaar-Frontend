import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import z from "zod";
import { AvailableUserRoles, UserRoles } from "../../utils/constants.js";
import { useState } from "react";
import { EyeOff } from "lucide-react";
import { Eye } from "lucide-react";
import useAuthStore from "../../store/useAuthStore.js";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

const signUpSchema = z.object({
  username: z
    .string()
    .toLowerCase()
    .trim()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters"),
  fullName: z
    .string()
    .toLowerCase()
    .trim()
    .min(5, "Full name must be at least 5 characters")
    .max(100, "Full name must be at most 100 characters"),
  email: z.string().email("Enter a valid email").trim(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password must be at most 20 characters"),
  role: z.enum(AvailableUserRoles).default("user"),
  avatar: z
    .any()
    .refine(
      (files) => files instanceof FileList && files.length > 0,
      "File is required"
    )
    .refine(
      (files) => files[0]?.size <= 5 * 1024 * 1024,
      "Max file size is 5MB"
    )
    .refine(
      (files) =>
        ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
          files[0]?.type
        ),
      "Only .jpeg, .jpg, .png, .webp files are allowed"
    ),
});

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [previewAvatar, setPreviewAvatar] = useState(null);

  const { signup, isSignInUp } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      role: UserRoles.USER,
    },
  });

  const avatar = watch("avatar");
  console.log("avatar", avatar);

  useEffect(() => {
    if (avatar && avatar.length > 0) {
      const avatarFile = avatar[0];
      const avatarURL = URL.createObjectURL(avatarFile);
      setPreviewAvatar(avatarURL);

      return () => URL.revokeObjectURL(avatarURL);
    }
    setPreviewAvatar(null);
  }, [avatar]);

  const onSubmit = async (userData) => {
    console.log("data", userData);
    const formData = new FormData();
    formData.append("username", userData.username);
    formData.append("fullName", userData.fullName);
    formData.append("email", userData.email);
    formData.append("password", userData.password);
    formData.append("role", userData.role);
    formData.append("avatar", userData.avatar[0]);
    console.log("formData", formData);

    try {
      await signup(formData);
    } catch (error) {
      console.log("Sign up error: ", error);
    }

    reset();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200/50 py-2">
      <div className="card w-full max-w-3xl shadow-lg bg-base-300 rounded-lg p-6 space-y-6">
        <h2 className="text-2xl font-semibold text-center text-base-content">
          Create an Account
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Side: Form Inputs */}
            <div className="space-y-4 md:order-1 order-2">
              {/* Username */}
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="username"
                    {...register("username")}
                    className={`input input-bordered w-full ${
                      errors.username ? "input-error" : ""
                    }`}
                    placeholder="Enter your username"
                  />
                </div>
                {errors.username && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.username.message}
                  </p>
                )}
              </div>

              {/* Full Name */}
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <div>
                  <input
                    type="text"
                    id="fullName"
                    {...register("fullName")}
                    className={`input input-bordered w-full ${
                      errors.fullName ? "input-error" : ""
                    }`}
                    placeholder="Enter your full name"
                  />
                </div>
                {errors.fullName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    {...register("email")}
                    className={`input input-bordered w-full ${
                      errors.email ? "input-error" : ""
                    }`}
                    placeholder="Enter your email"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
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
                  <p className="text-red-500 text-xs mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Role */}
              <div>
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-gray-700"
                >
                  Role
                </label>
                <div className="relative">
                  <select
                    id="role"
                    {...register("role")}
                    className={`select select-bordered w-full ${
                      errors.role ? "select-error" : ""
                    }`}
                  >
                    <option value="" disabled>
                      Select a role
                    </option>
                    <option value={UserRoles.ADMIN}>Admin</option>
                    <option value={UserRoles.USER}>User</option>
                  </select>
                </div>
                {errors.role && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.role.message}
                  </p>
                )}
              </div>
            </div>

            {/* Right Side: Avatar Upload */}
            <div className="flex flex-col md:order-2 order-1 items-center justify-center space-y-4">
              <div className="w-36 h-36 bg-base-100 rounded-full flex items-center justify-center">
                {/* Avatar Preview (Placeholder or uploaded image) */}
                {previewAvatar ? (
                  <img
                    src={previewAvatar}
                    alt="Avatar Preview"
                    className="w-36 h-36 rounded-full object-cover"
                  />
                ) : (
                  <span className="text-gray-500">Upload Avatar</span>
                )}
              </div>

              <div className="relative">
                <input
                  type="file"
                  id="avatar"
                  {...register("avatar")}
                  className={`input input-bordered w-full ${
                    errors.avatar ? "input-error" : ""
                  }`}
                  // accept="image/*"
                />
              </div>
              {errors.avatar && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.avatar.message}
                </p>
              )}
            </div>
          </div>
          <div className="text-center flex flex-col items-center mt-4 gap-2">
            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSignInUp}
              className="btn btn-primary w-32 max-w-36"
            >
              {isSignInUp ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span className="ml-2">Loading...</span>
                </>
              ) : (
                "Signup"
              )}
            </button>
            <Link to="/login" className="text-sm text-base-content">
              Already have an account? Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
