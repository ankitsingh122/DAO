"use client";
import { useState } from "react";
import { ethers } from "ethers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Card,
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useAddress } from "@thirdweb-dev/react";
import { proposalABI } from "../Proposal";
import Link from "next/link";

export default function CreateProposal() {
  const contractAddress = "0x18E53A850930bD457Ad77E255dd095B9c868D124";
  const [title, setTitle] = useState("");
  const [overview, setOverview] = useState("");
  const address = useAddress();

  const handleCreateProposal = async () => {
    if (!title || !overview) {
      toast.info("Please fill in both the title and overview.", {
        toastId: "success1",
      });
      return;
    }

    if (!address) {
      toast.info("Please connect your wallet.", {
        toastId: "success1",
      });
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
      const gasEstimate = await proposalContract.estimateGas.createProposal(
        title,
        overview
      );
      const tx = await proposalContract.createProposal(title, overview, {
        gasLimit: gasEstimate,
      });
      await tx.wait();
      console.log(tx, "transaction");
      toast.success("Proposal created successfully!", {
        toastId: "success1",
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to create proposal.", {
        toastId: "success1",
      });
    }
    setOverview("");
    setTitle("");
  };

  return (
    <>
      <div className="mx-auto w-full max-w-screen-sm justify-start mb-4">
        <Link href="/">
          <h1 className="text-sm mt-4"> {"<-"} Home</h1>
        </Link>
        <div className="font-semibold text-4xl py-4">Create a new Proposal</div>
      </div>

      <div className="mx-auto w-full max-w-screen-sm justify-start mb-4">
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
            <Button
              className="hover:bg-white hover:text-black hover:border-2"
              onClick={handleCreateProposal}
            >
              Create Proposal
            </Button>
          </CardFooter>
        </Card>
        <ToastContainer />
      </div>
    </>
  );
}
