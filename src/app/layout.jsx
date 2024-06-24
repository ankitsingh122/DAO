"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { ThirdwebProvider, metamaskWallet } from "@thirdweb-dev/react";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ThirdwebProvider
        supportedWallets={[
          metamaskWallet({
            recommended: true,
          }),
        ]}
        clientId="263ce4ddd19e94c4f99551c0effead31"
        activeChain="sepolia"
      >
        <body className={inter.className}>{children}</body>
      </ThirdwebProvider>
    </html>
  );
}
