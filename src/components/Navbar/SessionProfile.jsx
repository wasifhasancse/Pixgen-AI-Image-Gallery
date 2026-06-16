import { auth } from "@/lib/auth";
import { Avatar } from "@heroui/react";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { BiLogOut } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { MdDashboard } from "react-icons/md";

const SessionProfile = ({ session }) => {
  const user = session?.user;

  if (!user) return null;

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "?";

  const isValidUrl = (str) => {
    try {
      return Boolean(new URL(str));
    } catch {
      return false;
    }
  };

  const hasValidImage = user?.image && isValidUrl(user.image);

  const signOutAction = async () => {
    "use server";
    await auth.api.signOut({ headers: await headers() });
    revalidatePath("/");
    redirect("/signin");
  };

  return (
    <div className="flex items-center gap-3">
      <details className="group relative">
        <summary className="flex list-none cursor-pointer items-center gap-2 rounded-lg border border-slate-200 px-2 py-1.5 transition hover:bg-slate-50">
          <Avatar size="sm" aria-label="Profile menu">
            {hasValidImage ? (
              <Avatar.Image
                referrerPolicy="no-referrer"
                alt={user?.name || "User"}
                src={user?.image}
              />
            ) : null}
            <Avatar.Fallback>{initials}</Avatar.Fallback>
          </Avatar>
          <span className="hidden max-w-28 truncate text-sm font-medium sm:inline">
            {user?.name || "User"}
          </span>
        </summary>

        <div className="absolute right-0 z-50 mt-2 w-64 rounded-xl border border-slate-200 bg-white p-2 shadow-xl">
          <div className="mb-2 rounded-lg bg-slate-50 px-3 py-2">
            <p className="truncate text-sm font-semibold text-slate-800">
              {user?.name || "User"}
            </p>
            <p className="truncate text-xs text-slate-500">{user?.email}</p>
          </div>

          <div className="flex flex-col gap-1">
            <Link
              href={`/dashboard/${user?.role || "seller"}`}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-100"
            >
              <MdDashboard className="text-base" />
              Dashboard
            </Link>

            <Link
              href="/profile"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-100"
            >
              <CgProfile className="text-base" />
              Profile
            </Link>

            <form action={signOutAction}>
              <button
                type="submit"
                className="flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-rose-600 transition hover:bg-rose-50"
              >
                <BiLogOut className="text-base" />
                Logout
              </button>
            </form>
          </div>
        </div>
      </details>
    </div>
  );
};

export default SessionProfile;
