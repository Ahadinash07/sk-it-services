import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/cms/auth";
import AdminLogin from "@/components/AdminLogin";

export const dynamic = "force-dynamic";

// Already logged in? Skip the login screen and go straight to the editor.
export default async function AdminLoginPage() {
  const request = { cookies: cookies(), headers: headers() };
  if (getSession(request)) {
    redirect("/admin");
  }
  return <AdminLogin />;
}
