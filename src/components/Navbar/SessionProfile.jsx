import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { BiLogOut } from "react-icons/bi";

const SessionProfile = ({ session }) => {
  const user = session?.user;

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
    revalidatePath("/signin");
    redirect("/signin");
  };

  return (
    <div className="flex items-center gap-3">
      {/* Avatar + name link to profile */}
      <Link
        href="/profile"
        className="flex items-center gap-2 rounded-full pl-1 pr-3 py-1 hover:bg-gray-100 transition"
      >
        {hasValidImage ? (
          <Image
            src={user.image}
            alt={user.name ?? "avatar"}
            width={32}
            height={32}
            className="w-8 h-8 rounded-full object-cover border-2 border-violet-300"
          />
        ) : (
          <span className="w-8 h-8 rounded-full bg-violet-100 border-2 border-violet-300 flex items-center justify-center text-xs font-bold text-violet-600">
            {initials}
          </span>
        )}
        <span className="text-sm font-medium text-gray-700 hidden sm:block max-w-28 truncate">
          {user?.name}
        </span>
      </Link>

      {/* Sign out */}
      <form action={signOutAction}>
        <button
          type="submit"
          title="Sign Out"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-rose-600 hover:bg-rose-50 border border-rose-200 transition font-medium cursor-pointer"
        >
          <BiLogOut className="text-base" />
          <span className="hidden sm:inline">Sign Out</span>
        </button>
      </form>
    </div>
  );
};

export default SessionProfile;
