import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/";

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await signIn(data.email, data.password);
      Swal.fire({
        icon: "success",
        title: "Login Successful!",
        timer: 2000,
        showConfirmButton: false,
      });
      navigate(from);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error?.message || "Invalid credentials",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="w-full max-w-md p-8 rounded-xl bg-base-100 border border-base-300 shadow-sm space-y-6">

        <h2 className="text-2xl font-bold text-center text-primary">
          Login to RedPulseBD
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-sm text-error mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered w-full"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters required",
                },
              })}
            />
            {errors.password && (
              <p className="text-sm text-error mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Links */}
        <div className="text-sm text-center space-y-2">
          <p className="text-base-content/70">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-primary font-medium hover:underline"
            >
              Create one
            </Link>
          </p>

          <p className="text-base-content/70">
            Or{" "}
            <Link
              to="/"
              className="text-primary font-medium hover:underline"
            >
              go back to Home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
