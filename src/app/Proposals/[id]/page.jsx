"use client";

import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { ConnectWallet } from "@thirdweb-dev/react";
import { proposalABI } from "../../Proposal";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProposalDetail({ params }) {
  const [proposal, setProposal] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const contractAddress = "0x1f49707d48Cc49FfF79617D9A1b8494F7D74b984";

  useEffect(() => {
    const id = params?.id;
    const fetchProposal = async () => {
      try {
        if (!id) return;
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        const contract = new ethers.Contract(
          contractAddress,
          proposalABI,
          provider
        );

        const [ ,title, description, voteCount, executed] =
          await contract.getProp(id);
        const requiredVotes = await contract.REQUIRED_VOTES();

        if (!title || !description) {
          throw new Error("Proposal data not found");
        }

        setProposal({
          title,
          description,
          voteCount: voteCount.toString(),
          requiredVotes: requiredVotes.toString(),
        });
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    fetchProposal();
  }, [params]);

  const handleVote = async () => {
    const id = params?.id;
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        proposalABI,
        signer
      );

     const tx = await contract.vote(id);
     await tx.wait();
      toast.success("Voted successfully!");

      
      const [, , , voteCount] = await contract.getProp(id);
      setProposal((prev) => ({
        ...prev,
        voteCount: voteCount.toString(),
      }));
    } catch (error) {
      console.error("Error voting on proposal:", error);
      if (error.message.includes("Already voted")) {
        toast.info("You have already voted on this proposal.");
      } else {
        toast.error("Error voting on proposal.");
      }
    }
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
      <main className="flex flex-col items-center w-full max-w-4xl mt-8 space-y-8">
        {isLoading ? (
          <p>Loading...</p>
        ) : proposal ? (
          <>
            <div className="w-full max-w-md mb-4">
              <div className="relative h-4 bg-gray-200 rounded-full">
                <div
                  className="absolute h-4 bg-pink-500 rounded-full"
                  style={{
                    width: `${
                      (proposal.voteCount / proposal.requiredVotes) * 100
                    }%`,
                  }}
                ></div>
              </div>
              <div className="text-center mt-2">
                Votes: {proposal.voteCount} / {proposal.requiredVotes}
              </div>
            </div>
            <Card className="w-screen max-w-md">
              <CardHeader>
                <CardTitle className="text-center">{proposal.title}</CardTitle>
                <CardDescription className="text-center">
                  {proposal.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <Button onClick={handleVote}>Vote</Button>
              </CardContent>
            </Card>
            <ToastContainer />
          </>
        ) : (
          <p>Proposal not found</p>
        )}
      </main>
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
