"use client";
import { FaXTwitter } from "react-icons/fa6";
import { HiHome } from "react-icons/hi";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

function Sidebar() {
  const { data: session } = useSession();
  return (
    <div className="flex flex-col gap-4">
      <Link href="/">
        <FaXTwitter className="w-16 h-16 cursor-pointer p-3 hover:bg-gray-100 rounded-full transition-all duration-200" />
      </Link>
      <Link
        href="/"
        className="flex items-center p-3 hover:bg-gray-100 rounded-full transition-all duration-200 gap-2 w-fit"
      >
        <HiHome className="w-7 h-7" />
        <span className="font-bold hidden xl:inline">Home</span>
      </Link>
      {session ? (
        <>
          {" "}
          <button
            className="bg-blue-400 text-white rounded-full hover:bg-brightness-95 transition-all duration-200 h-9 w-48 shadow-lg hidden xl:inline"
            onClick={() => signOut()}
          >
            Sign out
          </button>
        </>
      ) : (
        <>
          {" "}
          <button
            className="bg-blue-400 text-white rounded-full hover:bg-brightness-95 transition-all duration-200 h-9 w-48 shadow-lg hidden xl:inline"
            onClick={() => signIn()}
          >
            Sign in
          </button>
        </>
      )}
    </div>
  );
}

export default Sidebar;
