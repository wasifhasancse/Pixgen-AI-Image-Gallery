import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import SessionProfileDropdownClient from "./SessionProfileDropdownClient";

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
    <SessionProfileDropdownClient
      user={user}
      initials={initials}
      hasValidImage={hasValidImage}
      signOutAction={signOutAction}
    />
  );
};

export default SessionProfile;
