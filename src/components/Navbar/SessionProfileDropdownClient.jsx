"use client";

import { Avatar } from "@heroui/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { MdDashboard } from "react-icons/md";

const SessionProfileDropdownClient = ({
  user,
  initials,
  hasValidImage,
  signOutAction,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div className="flex items-center gap-3" ref={rootRef}>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 px-2 py-1.5 transition hover:bg-slate-50"
          aria-haspopup="menu"
          aria-expanded={isOpen}
          aria-label="Open profile menu"
        >
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
        </button>

        {isOpen ? (
          <div className="absolute right-0 z-50 mt-2 w-64 rounded-xl border border-slate-200 bg-white p-2 shadow-xl">
            <div className="mb-2 rounded-lg bg-slate-50 px-3 py-2">
              <p className="truncate text-sm font-semibold text-slate-800">
                {user?.name || "User"}
              </p>
              <p className="truncate text-xs text-slate-500">{user?.email}</p>
            </div>

            <div className="flex flex-col gap-1">
              <Link
                href={`/dashboard/${user?.role}`}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-100"
              >
                <MdDashboard className="text-base" />
                Dashboard
              </Link>

              <Link
                href="/profile"
                onClick={() => setIsOpen(false)}
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
        ) : null}
      </div>
    </div>
  );
};

export default SessionProfileDropdownClient;
