"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Icon from "@/components/Icon";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  // If a session is already valid, go straight to the dashboard.
  useEffect(() => {
    let cancelled = false;
    fetch("/api/admin/auth", { credentials: "include" })
      .then((response) => response.json())
      .then((data) => {
        if (!cancelled && data?.authenticated) window.location.assign("/admin");
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  async function onSubmit(event) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/admin/auth", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        setError(data.error || "Invalid password");
        return;
      }
      window.location.assign("/admin");
    } catch {
      setError("Unable to reach the login service. Check your connection and try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#041408] px-4">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#22c55e]/20 blur-3xl" />
        <div className="absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-[#22c55e]/15 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-[#b5f23d] shadow-[0_0_24px_rgba(181,242,61,0.4)]">
            <Icon name="lock" className="h-8 w-8 text-[#0e1b17]" />
          </div>
          <Image src="/logo.png" alt="SK IT Services" width={160} height={54} className="mx-auto h-10 w-auto object-contain drop-shadow-[0_0_12px_rgba(34,197,94,0.3)]" />
          <p className="mt-3 text-xs font-black uppercase tracking-[.18em] text-[#22c55e]">Website editor</p>
          <h1 className="mt-1 text-2xl font-black tracking-tight text-white">Content Studio</h1>
          <p className="mt-2 text-sm text-white/60">Sign in to update your website content.</p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[.04] p-6 backdrop-blur-sm sm:p-8">
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-[.12em] text-white/60">Admin password</label>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoFocus
                placeholder="Enter your password"
                className="min-h-11 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-medium text-white shadow-sm outline-none transition placeholder:text-white/40 focus:border-[#22c55e] focus:ring-2 focus:ring-[#22c55e]/25"
              />
            </div>

            {error && (
              <div role="alert" className="flex items-start gap-2 rounded-xl border border-red-400/30 bg-red-400/10 px-3 py-2.5 text-sm font-semibold text-red-200">
                <Icon name="x" className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={busy || !password}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#b5f23d] px-4 py-3 text-sm font-black text-[#0e1b17] shadow-[0_0_16px_rgba(181,242,61,0.35)] transition hover:bg-[#a4e628] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Icon name="lock" className="h-4 w-4" />
              {busy ? "Signing in…" : "Sign in"}
            </button>
          </form>

          <p className="mt-5 text-center text-[11px] leading-relaxed text-white/40">
            Protected area. Your password is stored as an environment variable on the server and never reaches the browser.
          </p>
        </div>

        <p className="mt-6 text-center text-[11px] text-white/30">
          SK IT Services · Plaza Imbi, Kuala Lumpur
        </p>
      </div>
    </div>
  );
}
