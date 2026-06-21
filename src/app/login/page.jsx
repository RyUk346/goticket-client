"use client";
import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { signIn } from "@/lib/auth-client";
import Logo from "@/components/Logo";
import AuthAside from "@/components/AuthAside";
import { FcGoogle } from "react-icons/fc";
import { FiLoader } from "react-icons/fi";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawRedirect = searchParams.get("redirect") || "/";
  const redirectTo = rawRedirect.startsWith("/") && !rawRedirect.startsWith("//") ? rawRedirect : "/";
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [google, setGoogle] = useState(false);

  const onSubmit = async (values) => {
    setLoading(true);
    const { error } = await signIn.email({ email: values.email, password: values.password });
    setLoading(false);
    if (error) return toast.error(error.message || "Invalid credentials");
    toast.success("Welcome back!");
    router.push(redirectTo);
    router.refresh();
  };

  const onGoogle = async () => {
    setGoogle(true);
    try {
      const res = await signIn.social({ provider: "google", callbackURL: redirectTo });
      if (res?.error) { toast.error(res.error.message || "Google sign-in failed"); setGoogle(false); }
    } catch {
      toast.error("Google sign-in failed. Please try again.");
      setGoogle(false);
    }
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <AuthAside />
      <div className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md animate-fade-up">
          <div className="lg:hidden"><Logo /></div>
          <h1 className="mt-8 text-3xl">Welcome back</h1>
          <p className="mt-2 text-ink-500 dark:text-ink-300">Log in to manage your bookings and trips.</p>
          <button onClick={onGoogle} disabled={google} className="btn-outline mt-8 w-full">
            {google ? <FiLoader className="animate-spin" /> : <FcGoogle className="h-5 w-5" />} Continue with Google
          </button>
          <div className="my-6 flex items-center gap-3 text-xs text-ink-400">
            <span className="h-px flex-1 bg-ink-200 dark:bg-white/10" /> OR <span className="h-px flex-1 bg-ink-200 dark:bg-white/10" />
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="label">Email</label>
              <input type="email" className="input" placeholder="you@example.com" {...register("email", { required: "Email is required" })} />
              {errors.email && <p className="mt-1 text-xs text-rose-500">{errors.email.message}</p>}
            </div>
            <div>
              <label className="label">Password</label>
              <input type="password" className="input" placeholder="••••••••" {...register("password", { required: "Password is required" })} />
              {errors.password && <p className="mt-1 text-xs text-rose-500">{errors.password.message}</p>}
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? <><FiLoader className="animate-spin" /> Signing in…</> : "Log in"}
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-ink-500 dark:text-ink-300">
            New to GoTicket? <Link href="/register" className="font-semibold text-brand-600 hover:underline dark:text-brand-300">Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return <Suspense fallback={null}><LoginForm /></Suspense>;
}