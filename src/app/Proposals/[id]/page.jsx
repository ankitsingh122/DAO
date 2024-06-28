"use client";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import { proposalABI } from "../../Proposal";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProposalDetail({ params }) {
  const [proposal, setProposal] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const contractAddress = "0x18E53A850930bD457Ad77E255dd095B9c868D124";
  const address = useAddress();

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

        const [
          ,
          title,
          description,
          voteCount,
          executed,
          creationDate,
          proposalCreator,
        ] = await contract.getProp(id);
        const requiredVotes = await contract.REQUIRED_VOTES();

        if (!title || !description) {
          throw new Error("Proposal data not found");
        }

        setProposal({
          title,
          description,
          executed,
          voteCount: voteCount.toString(),
          requiredVotes: requiredVotes.toString(),
          // ownerAddress,
          creationDate: new Date(creationDate * 1000).toLocaleString(),
          proposalCreator,
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
      if (!address) {
        toast.info("Please connect your wallet.");
        return;
      }

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
        toast.error("Reject voting on proposal.");
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
      <main className="flex flex-col  w-full max-w-4xl mt-8 space-y-8">
        {isLoading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading...</p>
          </div>
        ) : proposal ? (
          <>
            <div className="mx-auto w-full max-w-screen-sm justify-start mb-4">
              <Link href="/">
                <h1 className="text-sm py-2"> {"<-"} Home</h1>
              </Link>
              <Badge
                variant="default"
                className={
                  proposal.executed
                    ? "bg-green-500 text-white"
                    : "bg-yellow-500 text-white"
                }
              >
                {proposal.executed ? "Proposed" : "In Progress"}
              </Badge>

              <h1 className="mt-5 text-4xl font-semibold">{proposal.title}</h1>
              <h1 className="text-sm mt-5">
                <span className="font-medium">Proposed by</span>{" "}
                {proposal.proposalCreator} <br />
                <span className="font-medium">Created </span>
                {proposal.creationDate}
              </h1>
            </div>

            <Card className="mx-auto w-full max-w-screen-sm">
              <CardHeader className="">
                <div className="flex justify-between ">
                  <h1 className="text-center font-semibold mt-2 md:text-xl ">
                    Support progress
                  </h1>
                  <Button
                    className="bg-pink-500 text-white"
                    onClick={handleVote}
                  >
                    Vote Now
                  </Button>
                </div>
                <hr />
              </CardHeader>
              <CardDescription className="p-6">
                <div className="w-full max-w-screen-sm mb-4">
                  <div className="relative h-4 bg-pink-200 rounded-full">
                    <div
                      className="absolute h-4 bg-pink-500 rounded-full"
                      style={{
                        width: `${
                          (proposal.voteCount / proposal.requiredVotes) * 100
                        }%`,
                      }}
                    ></div>
                  </div>
                  <div className=" mt-2">
                    VOTES DELEGATED <br />
                    <span className="text-xl font-semibold">
                      {" "}
                      <span
                        className={
                          proposal.executed
                            ? "text-green-500 "
                            : "text-red-500 "
                        }
                      >
                        {proposal.voteCount}
                      </span>{" "}
                      / {proposal.requiredVotes}
                    </span>
                  </div>
                  <h1 className="mt-5 text-black">
                    This proposal needs {proposal.requiredVotes} votes to
                    progress and can be terminated by the author at any time.
                  </h1>
                </div>
              </CardDescription>
            </Card>

            <Card className="mx-auto w-full max-w-screen-sm">
              <CardHeader>
                <CardTitle>Proposal Details</CardTitle>
                <hr />
                <CardDescription className=" text-center"></CardDescription>
                <br /> {proposal.description}
              </CardHeader>
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
