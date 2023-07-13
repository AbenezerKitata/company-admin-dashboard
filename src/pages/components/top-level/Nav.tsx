import { useSession, signIn, signOut } from "next-auth/react";
import React from "react";
// import { Button } from "../in-page/Button";

function Nav() {
  const { data: sessionData, status } = useSession();
  return (
    <nav className="flex items-center justify-between bg-yellow-400 px-6 py-4">
      <div className="flex items-center">
        <span className="text-xl font-bold text-white">Admin Dashboard</span>
      </div>
      <div className="flex items-center">
        {/* <Button /> */}
        <button className="rounded-full bg-yellow-700 p-2 text-lg text-white hover:bg-yellow-900 focus:outline-none">
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </button>
        <button className="ml-4 rounded-full bg-yellow-700 p-2 text-lg text-white hover:bg-yellow-900 focus:outline-none">
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <button
          className="ml-4 rounded-full bg-yellow-700 p-2 text-lg text-white hover:bg-yellow-900 focus:outline-none"
          onClick={
            status === "authenticated"
              ? () => void signOut()
              : () => void signIn()
          }
        >
          {sessionData ? "Sign out" : "Sign in"}
        </button>
      </div>
    </nav>
  );
}

export default Nav;
