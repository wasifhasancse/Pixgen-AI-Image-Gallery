import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import SessionProfile from "./SessionProfile";
//website title: pixgen - AI Image
const Navbar = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return (
    <div className="border-b px-2">
      <nav className=" flex justify-between items-center py-3 max-w-11/12 mx-auto w-full">
        <div className="flex gap-2 items-center">
          <Image
            src={"/logo.png"}
            alt="logo"
            loading="eager"
            width={30}
            height={30}
            className="object-cover h-auto w-auto"
          />
          <h3 className="font-black text-lg">pixgen.</h3>
        </div>

        <ul className="flex items-center gap-5 text-sm">
          <li>
            <Link href={"/"} className="px-2 py-1 hover:bg-gray-200 rounded">
              Home
            </Link>
          </li>
          <li>
            <Link
              href={"/all-photos"}
              className="px-2 py-1 hover:bg-gray-200 rounded"
            >
              All Photos
            </Link>
          </li>
          <li>
            <Link
              href={"/pricing"}
              className="px-2 py-1 hover:bg-gray-200 rounded"
            >
              Pricing
            </Link>
          </li>
         
        </ul>

        <div className="flex gap-4">
          <ul className="flex items-center gap-4 text-sm">
            {session?.user ? (
              <div>
                <SessionProfile session={session} />
              </div>
            ) : (
              <>
                <li>
                  <Link
                    href={"/signup"}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-violet-600 hover:bg-violet-50 border border-violet-200 transition font-medium cursor-pointer"
                  >
                    Sign Up
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/signin"}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-sky-600 hover:bg-sky-50 border border-sky-200 transition font-medium cursor-pointer"
                  >
                    Sign In
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
