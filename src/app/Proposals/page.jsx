'use client'

import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHeader,
  TableHead,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ConnectWallet } from "@thirdweb-dev/react";
import { proposalABI } from "../Proposal";
import { useRouter } from "next/navigation";

export default function Proposal() {
  const [proposals, setProposals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const contractAddress = "0x1f49707d48Cc49FfF79617D9A1b8494F7D74b984";

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          proposalABI,
          signer
        );
        const nextProposalId = await contract.nextProposalId();
        const proposalArray = [];

        for (let i = 0; i < nextProposalId; i++) {
          const proposal = await contract.proposals(i);
          proposalArray.push(proposal);
        }

        setProposals(proposalArray);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching proposals:", error);
        setIsLoading(false);
      }
    };

    fetchProposals();
  }, []);
  
  const router = useRouter();

  const handleRowClick = (index) => {
    router.push(`/Proposals/${index}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <header className="w-full flex justify-between items-center p-4 bg-white shadow-md">
        <div className="flex items-center">
          <LogInIcon className="h-8 w-8 text-pink-500" />
        </div>
        <ConnectWallet />
      </header>
      <main className="flex flex-col items-center w-full max-w-4xl mt-8 space-y-8">
        <div className="flex justify-center space-x-2">
          <Link href="/Homeproposal">
            <Button variant="outline">Home</Button>
          </Link>
          <Button variant="outline">New</Button>
        </div>
        <Card className="mx-auto w-full max-w-screen-md text-center">
          <CardHeader>
            <CardTitle>Creating a proposal</CardTitle>
            <CardDescription>
              On Fish.vote, anyone can publish a{" "}
              
                Crowd Proposal
             
              . Then comes the most important work: gathering support from the
              broader UNI community. We recommend sharing the link to your
              proposal publicly and finding others who support you. Once your
              proposal reaches 400 delegate votes, it will be displayed on the
              Fish.vote home page.
              <br />
              <br />
              Until today, only whales with 10 million votes could submit
              proposals. Now,{" "}
              <span className="text-red-500">even fish can make waves</span>.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="mx-auto w-full max-w-screen-md">
          <CardHeader className="flex justify-between items-center">
            <CardTitle>New proposals</CardTitle>
            <Link href="/CreateProposal">
              <Button className="bg-pink-500 text-white mt-5">
                Create Proposal
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className = 'font-bold'>Title</TableHead>
                  <TableHead className="text-center font-bold">Vote Count</TableHead>
                  <TableHead className="text-right font-bold">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell className="text-center" colSpan={3}>
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : (
                  proposals.map((proposal, index) => (
                    <TableRow
                      key={index}
                      className="cursor-pointer"
                      onClick={() => handleRowClick(index)}
                    >
                      <TableCell>{proposal.title}</TableCell>

                      <TableCell className="text-center">
                        {proposal.voteCount.toString()} votes
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge
                          variant="default"
                          className={`bg-${
                            proposal.executed ? "green" : "yellow"
                          }-500 text-white`}
                        >
                          {proposal.executed ? "Proposed" : "In Progress"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <div></div>
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
