"use client";
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
import { Table, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ConnectWallet } from "@thirdweb-dev/react";
import { proposalABI } from "../Proposal";
import { useRouter } from "next/navigation";

export default function HomeProposal() {
  const [proposals, setProposals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const contractAddress = "0x18E53A850930bD457Ad77E255dd095B9c868D124";

  useEffect(() => {
    setIsClient(true);

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

        
        const filteredProposals = proposalArray.filter(
          (proposal) => proposal.voteCount.toNumber() > 50
        );

        setProposals(filteredProposals);
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
          <Button variant="outline">Home</Button>
          <Link href="/Proposals">
            <Button variant="outline">New</Button>
          </Link>
        </div>
        <Card className="mx-auto w-full max-w-screen-md ">
          <CardHeader>
            <CardTitle className="text-center">Creating a Proposal</CardTitle>
            <hr />
            <CardDescription>
              On Fish.vote, anyone can publish a Crowd Proposal. Then comes the
              most important work: gathering support from the broader UNI
              community. We recommend sharing the link to your proposal publicly
              and finding others who support you. Once your proposal reaches 400
              delegate votes, it will be displayed on the Fish.vote home page.
              <br />
              Until today, only whales with 10 million votes could submit
              proposals. Now,{" "}
              <span className="text-red-500">even fish can make waves</span>.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="mx-auto w-full max-w-screen-md">
          <CardHeader>
            <div className="flex justify-between items-center">
              <h1 className="text-center font-semibold mt-3  md:text-xl">
                Top Proposals
              </h1>
              <Link href="/CreateProposal">
                <Button className="bg-pink-500 text-white">
                  Create Proposal
                </Button>
              </Link>
            </div>
            <hr />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center">Loading...</div>
            ) : proposals.length === 0 ? (
              <CardDescription className="text-center">
             
                  <span className=" font-medium ">Nothing here yet</span> <br />
                  <p className="p-5">
                    The home page only shows proposals with <br /> 50 votes or
                    more. Once there are proposals <br /> with more support,
                    they’ll appear here.
                  </p>
                  <Link href="/Proposals">
                    <span className="text-red-500">
                      Read new proposals {"->"}
                    </span>
                  </Link>
             
              </CardDescription>
            ) : (
              <Table>
                <TableBody>
                  {proposals.map((proposal, index) => (
                    <TableRow
                      key={index}
                      className="cursor-pointer"
                      onClick={() => isClient && handleRowClick(index)}
                    >
                      <TableCell className="w-4/5">
                        <span className="text-lg font-medium">
                          {proposal.title}
                        </span>{" "}
                        <br /> {proposal.voteCount.toString()} votes
                      </TableCell>
                      <TableCell className="w-1/5 text-right">
                        <Badge
                          variant="default"
                          className={`inline-block px-2 py-1 rounded-full ${
                            proposal.executed
                              ? "bg-green-500 text-white"
                              : "bg-yellow-500 text-white"
                          }`}
                        >
                          {proposal.executed ? "Proposed" : "In Progress"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
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
