"use client";
import { authClient } from "@/lib/auth-client";
import { FcGoogle } from "react-icons/fc";

const SignInWithGoogle = () => {
  const handleGoogleSignIn = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
    });
  };
  return (
    <button
      type="button"
      onClick={handleGoogleSignIn}
      className="w-full flex items-center justify-center gap-3 px-4 py-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition text-sm font-semibold text-gray-700 shadow-sm mb-6 cursor-pointer"
    >
      <FcGoogle className="text-xl" />
      Continue with Google
    </button>
  );
};

export default SignInWithGoogle;
