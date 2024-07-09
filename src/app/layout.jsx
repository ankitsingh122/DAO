"use client";

import { useState, useEffect } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThirdwebProvider, metamaskWallet } from "@thirdweb-dev/react";
import Navbar from "./components/Navbar";
import { NextUIProvider } from "@nextui-org/react";


const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    document.body.className = isDarkMode ? "dark" : "light";
  }, [isDarkMode]);

  return (
    <html lang="en" className={inter.className}>
      <body className="">
        <ThirdwebProvider
          supportedWallets={[
            metamaskWallet({
              recommended: true,
            }),
          ]}
          clientId="263ce4ddd19e94c4f99551c0effead31"
          activeChain="sepolia"
        >
          <NextUIProvider>
            <div className="h-screen flex flex-col">
              <Navbar />
             
              <div className="flex flex-col items-center flex-grow overflow-auto">
                {children}
              </div>
            </div>
          </NextUIProvider>
        </ThirdwebProvider>
      </body>
    </html>
  );
}

