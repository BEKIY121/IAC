"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, AlertCircle } from "lucide-react";
import { IacLogo } from "@/components/ui/Logo";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(
          data.error === "Invalid password"
            ? "Invalid password. Check ADMIN_PASSWORD in .env.local and restart the dev server."
            : data.error === "Unauthorized"
              ? "Login blocked by server. Restart dev server (npm run dev) and try again."
              : data.error || "Login failed"
        );
      }

      const from = searchParams.get("from") || "/admin/dashboard/";
      router.push(from);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-xl">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex justify-center">
            <IacLogo size="lg" />
          </div>
          <h1 className="text-2xl font-bold text-navy">Admin Portal</h1>
          <p className="mt-2 text-sm text-slate-muted">
            Sign in to manage IAC content
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="flex items-center gap-2 rounded-xl bg-red-50 p-3 text-sm text-red-700">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {error}
            </div>
          )}

          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-navy">
              Admin Password
            </label>
            <div className="relative">
              <Lock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-muted" />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-xl border border-gray-200 py-3 pr-4 pl-10 transition focus:border-mint-primary focus:ring-2 focus:ring-mint-primary/20 focus:outline-none"
                placeholder="Enter admin password"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-mint-primary py-3 font-semibold text-white transition hover:bg-mint-primary-dark disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-slate-muted">
          <Link href="/" className="text-mint-primary hover:underline">
            ← Back to website
          </Link>
        </p>
      </div>
    </div>
  );
}
