"use client";
import React, { useState, useContext } from "react";
import { useAuth } from "@/app/hooks/useAuth";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";

type SignInForm = {
  email: string;
  password: string;
};

export default function SignInPage() {
  const { login, authLoading } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInForm>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<SignInForm> = async (data) => {
    try {
      setError(null);
      await login(data);
      router.push("/");
    } catch (err: any) {
      setError(err.message || "Failed to sign in. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800 py-16 px-4 sm:px-8 lg:px-12">
      <div className="max-w-lg w-full space-y-10 bg-gray-900/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl transform -rotate-1">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-cyan-300 tracking-wide">
            Welcome Back
          </h2>
          <p className="mt-2 text-gray-400 text-lg">Sign in to explore</p>
        </div>
        
        <form className="mt-10 space-y-8" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-6">
            <div className="relative">
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Invalid email address",
                  },
                })}
                className="w-full px-5 py-4 bg-gray-700/50 border border-gray-600 text-gray-100 placeholder-gray-400 rounded-2xl focus:outline-none focus:ring-4 focus:ring-cyan-500/50 focus:border-cyan-400 transition-all duration-300 text-lg"
                placeholder="Your email"
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-400 absolute -bottom-6 left-2">
                  {errors.email.message}
                </p>
              )}
            </div>
            
            <div className="relative">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                type="password"
                {...register("password", {
                  required: "Password is required",
                  // minLength: {
                  //   value: 6,
                  //   message: "Password must be at least 6 characters",
                  // },
                })}
                className="w-full px-5 py-4 bg-gray-700/50 border border-gray-600 text-gray-100 placeholder-gray-400 rounded-2xl focus:outline-none focus:ring-4 focus:ring-cyan-500/50 focus:border-cyan-400 transition-all duration-300 text-lg"
                placeholder="Your password"
              />
              {errors.password && (
                <p className="mt-2 text-sm text-red-400 absolute -bottom-6 left-2">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          {error && (
            <div className="text-sm text-red-400 text-center bg-gray-700/30 py-2 px-4 rounded-xl">
              {error}
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting || authLoading}
              className="relative flex items-center justify-center px-8 py-3 bg-cyan-500 text-gray-900 text-lg font-semibold rounded-xl hover:bg-cyan-400 focus:outline-none focus:ring-4 focus:ring-cyan-300/50 disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
            >
              {isSubmitting || authLoading ? (
                <span className="absolute left-3 flex items-center">
                  <svg
                    className="animate-spin h-5 w-5 text-gray-900"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                </span>
              ) : null}
              Sign In
            </button>
          </div>
        </form>

        <div className="text-center">
          <p className="text-gray-400 text-lg">
            New here?{" "}
            <a
              href="/signup"
              className="font-semibold text-cyan-400 hover:text-cyan-300 transition-colors duration-200"
            >
              Create an account
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}