"use client";
import { signOut, useSession } from "next-auth/react";

function ManualSignOut() {
  const { data: session } = useSession();
  return (
    <>
      {session ? (
        <>
          <button
            className="bg-blue-400 text-white px-4 py-1 rounded-full font-medium shadow-md hover:brightness-95"
            onClick={signOut}
          >
            Sign Out
          </button>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default ManualSignOut;
