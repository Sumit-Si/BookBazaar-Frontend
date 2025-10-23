import React from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200/50 py-2">
      <div className="card w-full max-w-3xl shadow-lg bg-base-300 rounded-lg p-6 space-y-6">
        <h2 className="text-2xl font-semibold text-center text-base-content">
          Create an Account
        </h2>
        <form
          onSubmit={() => {}}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
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
              <input
                type="text"
                id="username"
                name="username"
                className="input input-bordered w-full"
                placeholder="Enter your username"
                // value={formData.username}
                // onChange={handleChange}
                required
              />
            </div>

            {/* Full Name */}
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                className="input input-bordered w-full"
                placeholder="Enter your full name"
                // value={formData.fullName}
                // onChange={handleChange}
                required
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="input input-bordered w-full"
                placeholder="Enter your email"
                // value={formData.email}
                // onChange={handleChange}
                required
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="input input-bordered w-full"
                placeholder="Create a password"
                // value={formData.password}
                // onChange={handleChange}
                required
              />
            </div>

            {/* Role */}
            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700"
              >
                Role
              </label>
              <select
                id="role"
                name="role"
                className="select select-bordered w-full"
                // value={formData.role}
                // onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select a role
                </option>
                <option value="admin">Admin</option>
                <option selected value="user">
                  User
                </option>
              </select>
            </div>
          </div>

          {/* Right Side: Avatar Upload */}
          <div className="flex flex-col md:order-2 order-1 items-center justify-center space-y-4">
            <div className="w-36 h-36 bg-base-100 rounded-full flex items-center justify-center">
              {/* Avatar Preview (Placeholder or uploaded image) */}
              {/* {formData.avatar ? ( */}
              {/* <img
                //   src={URL.createObjectURL(formData.avatar)}
                alt="Avatar"
                className="w-36 h-36 rounded-full object-cover"
              />
              ) : (<span className="text-gray-500">Upload Avatar</span>
              )} */}
            </div>

            <input
              type="file"
              id="avatar"
              name="avatar"
              className="file-input w-full max-w-xs"
              //   onChange={handleChange}
              accept="image/*"
            />
          </div>
        </form>

        <div className="text-center flex flex-col items-center mt-4 gap-2">
          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary w-32 max-w-36"
          >
            Sign Up
          </button>
          <Link to="/login" className="text-sm text-base-content">
            Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
