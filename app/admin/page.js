import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { isAuthenticated, isAuthConfigured } from "@/lib/cms/auth";
import AdminClient from "@/components/AdminClient";

export const dynamic = "force-dynamic";

// The dashboard is only reachable with a valid admin session.
// When auth is not configured, fall back to the previous direct-access behaviour
// so a deployment that never set credentials still works.
export default async function AdminPage() {
  const request = { cookies: cookies(), headers: headers() };
  if (isAuthConfigured() && !isAuthenticated(request)) {
    redirect("/admin/login");
  }
  return <AdminClient />;
}