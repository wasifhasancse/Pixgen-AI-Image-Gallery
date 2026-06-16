import { auth } from "@/lib/auth";
import { Avatar } from "@heroui/react";
import { headers } from "next/headers";
import Link from "next/link";
import {
  HiOutlineBanknotes,
  HiOutlineCube,
  HiOutlineHome,
  HiOutlineUsers,
} from "react-icons/hi2";

const DashboardSidebar = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;
  const role = user?.role || "buyer";

  const dashboardItems = {
    seller: [
      { icon: HiOutlineHome, label: "Overview", link: "/dashboard/seller" },
      {
        icon: HiOutlineCube,
        label: "Products",
        link: "/dashboard/seller/products",
      },
      {
        icon: HiOutlineBanknotes,
        label: "Transaction",
        link: "/dashboard/seller/transaction",
      },
    ],

    buyer: [
      { icon: HiOutlineHome, label: "Overview", link: "/dashboard/buyer" },
      {
        icon: HiOutlineCube,
        label: "Products",
        link: "/dashboard/buyer/products",
      },
      {
        icon: HiOutlineBanknotes,
        label: "Transaction",
        link: "/dashboard/buyer/transaction",
      },
    ],

    admin: [
      { icon: HiOutlineHome, label: "Overview", link: "/dashboard/admin" },
      {
        icon: HiOutlineUsers,
        label: "User Manage",
        link: "/dashboard/admin/users",
      },
      {
        icon: HiOutlineBanknotes,
        label: "Transaction",
        link: "/dashboard/admin/transaction",
      },
    ],
  };

  const activeItems = dashboardItems[role] || dashboardItems.buyer;
  const initials = user?.name
    ? user.name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "?";
  const roleLabel = role.charAt(0).toUpperCase() + role.slice(1);

  return (
    <aside className="hidden h-full w-72 shrink-0 border-r border-slate-200/80 bg-white/70 p-4 backdrop-blur xl:block space-y-5">


      <div className="mt-6">
        <p className="px-2 text-xs font-semibold tracking-wide text-slate-400 uppercase">
          Navigation
        </p>
        <nav className="mt-3 flex flex-col gap-1.5">
          {activeItems.map((item, index) => {
            const isDefaultActive = index === 0;

            return (
              <Link
                key={item.label}
                href={item.link}
                aria-current={isDefaultActive ? "page" : undefined}
                className={`group flex items-center gap-3 rounded-xl border px-3 py-2.5 text-sm font-medium transition ${
                  isDefaultActive
                    ? "border-sky-200 bg-linear-to-r from-sky-50 to-cyan-50 text-slate-900 shadow-sm"
                    : "border-transparent text-slate-700 hover:border-slate-200 hover:bg-slate-50"
                }`}
              >
                <span
                  className={`grid size-7 place-items-center rounded-lg transition ${
                    isDefaultActive
                      ? "bg-white text-sky-700 ring-1 ring-sky-200"
                      : "text-slate-400 group-hover:bg-white group-hover:text-slate-700"
                  }`}
                >
                  <item.icon className="size-4.5" />
                </span>
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <p className="text-sm font-semibold text-slate-800">Tips</p>
        <p className="mt-1 text-xs leading-5 text-slate-500">
          Complete your profile and upload at least 5 items to improve
          visibility.
        </p>
      </div>


      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-linear-to-br from-sky-50 via-white to-cyan-100 p-4">
        <div className="pointer-events-none absolute -top-8 -right-8 h-24 w-24 rounded-full bg-sky-200/40 blur-2xl" />
        <div className="relative flex items-center gap-3">
          <Avatar size="sm" aria-label="User avatar">
            <Avatar.Image alt={user?.name || "User"} src={user?.image || ""} />
            <Avatar.Fallback>{initials}</Avatar.Fallback>
          </Avatar>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-800">
              {user?.name || "Unknown User"}
            </p>
            <p className="truncate text-xs text-slate-500">{user?.email}</p>
          </div>
        </div>
        <div className="relative mt-3 inline-flex rounded-full border border-sky-200 bg-white/80 px-3 py-1 text-xs font-medium text-sky-700">
          {roleLabel} Account
        </div>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
