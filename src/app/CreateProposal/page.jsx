"use client";
import { useState } from "react";
import { ethers } from "ethers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import { proposalABI } from "../Proposal";
import Link from "next/link";

export default function CreateProposal() {
  const contractAddress = "0x1f49707d48Cc49FfF79617D9A1b8494F7D74b984";
  const [title, setTitle] = useState("");
  const [overview, setOverview] = useState("");
  const address = useAddress();

  const handleCreateProposal = async () => {
    if (!title || !overview) {
      toast.info("Please fill in both the title and overview.");
      return;
    }

    if (!address) {
      toast.info("Please connect your wallet.");
      return;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const proposalContract = new ethers.Contract(
      contractAddress,
      proposalABI,
      signer
    );

    try {
      const tx = await proposalContract.createProposal(title, overview, {
        gasLimit: 600000,
      });
      await tx.wait();
      console.log(tx, "transaction");
      toast.success("Proposal created successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create proposal.");
    }
    setOverview("");
    setTitle("");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <header className="w-full flex justify-between items-center p-4 bg-white shadow-md">
        <div className="flex items-center">
          <Link href="/">
            <LogInIcon className="h-8 w-8 text-pink-500" />
          </Link>
        </div>
        <ConnectWallet />
      </header>

      <div className="font-bold text-4xl mt-12">Create a new Proposal</div>

      <div className="flex flex-col space-y-5 items-center justify-center mt-10">
        <Card className="w-screen max-w-3xl">
          <CardHeader>
            <CardTitle>Proposal Description</CardTitle>
            <hr />
            <CardDescription>
              Fill out the details below to create a new proposal.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Enter proposal title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="overview">Overview</Label>
              <Textarea
                id="overview"
                placeholder="Provide an overview of the proposal"
                rows={5}
                value={overview}
                onChange={(e) => setOverview(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button className="hover:bg-white hover:text-black hover:border-2" onClick={handleCreateProposal}>Create Proposal</Button>
          </CardFooter>
        </Card>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </div>
  );
}

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
