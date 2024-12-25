'use client';

import { signIn } from "next-auth/react";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(
    searchParams.get('error') || null
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      const response = await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        redirect: false,
      });

      if (response?.error) {
        setError(response.error);
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred during login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020817] relative">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-indigo-500/20" />
      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md p-8 bg-blue-900/20 backdrop-blur-sm border border-blue-500/20 rounded-lg relative">
        <h1 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600">Welcome Back</h1>
        
        {error && (
          <div className="bg-red-900/50 text-red-200 p-2 rounded border border-red-500/20">
            {error}
          </div>
        )}

        <div>
          <label htmlFor="email" className="block mb-1 text-blue-200">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full p-2 rounded bg-blue-950/50 border-blue-500/20 text-white placeholder-blue-300/50 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="password" className="block mb-1 text-blue-200">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            className="w-full p-2 rounded bg-blue-950/50 border-blue-500/20 text-white placeholder-blue-300/50 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Login
        </button>

        <p className="text-center text-blue-200 text-sm">
          Don't have an account?{' '}
          <a href="/signup" className="text-blue-400 hover:text-blue-300">
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
}

function LoginLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020817] relative">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-indigo-500/20" />
      <div className="animate-pulse space-y-4 w-full max-w-md p-8 bg-blue-900/20 backdrop-blur-sm border border-blue-500/20 rounded-lg relative">
        <div className="h-8 bg-blue-200/20 rounded w-1/3"></div>
        <div className="space-y-2">
          <div className="h-4 bg-blue-200/20 rounded w-1/4"></div>
          <div className="h-10 bg-blue-200/20 rounded"></div>
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-blue-200/20 rounded w-1/4"></div>
          <div className="h-10 bg-blue-200/20 rounded"></div>
        </div>
        <div className="h-10 bg-blue-200/20 rounded"></div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginLoading />}>
      <LoginForm />
    </Suspense>
  );
}