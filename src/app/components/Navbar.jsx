import React from 'react'
import { ConnectWallet } from "@thirdweb-dev/react";
import Link from 'next/link';
function Navbar() {
  return (
    <>
      <div className="w-full flex justify-between items-center p-4 bg-white  shadow-lg z-10 relative">
        <div className="flex items-center">
          <Link href="/">
            <LogInIcon className="h-8 w-8 text-pink-500" />
          </Link>
        </div>
        <ConnectWallet />
      </div>
    </>
  );
}

export default Navbar;
function LogInIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
      <polyline points="10 17 15 12 10 7" />
      <line x1="15" x2="3" y1="12" y2="12" />
    </svg>
  );
}
