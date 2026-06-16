import DashboardSidebar from "@/components/Dashboard/DashboardSidebar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function DashboardLayout({ children }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto flex min-h-screen max-w-375">
        <DashboardSidebar />

        <div className="flex-1 overflow-y-auto">
          <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/80 px-4 py-4 backdrop-blur md:px-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold tracking-wide text-slate-400 uppercase">
                  Dashboard
                </p>
                <h1 className="text-lg font-bold text-slate-800 md:text-2xl">
                  Welcome back, {session?.user?.name || "Creator"}
                </h1>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-600">
                Plan: {session?.user?.plan || "free"}
              </div>
            </div>
          </header>

          <main className="p-4 md:p-6">
            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-4 shadow-sm md:p-6">
              <div className="pointer-events-none absolute -top-20 -right-20 h-56 w-56 rounded-full bg-cyan-200/30 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-sky-200/30 blur-3xl" />
              <div className="relative">{children}</div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
