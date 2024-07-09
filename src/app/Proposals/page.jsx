"use client";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
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
import { proposalABI } from "../Proposal";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";
import Contents from "../components/Contents";

export default function Proposal() {
  const [proposals, setProposals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const contractAddress = "0x18E53A850930bD457Ad77E255dd095B9c868D124";

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
  const handleCreateProposal = () => {
    router.push("CreateProposal");
  };

  return (
    <>
      <main className="flex flex-col items-center w-full max-w-4xl mt-8 space-y-8">
        <Contents />
        <Card className="mx-auto w-full max-w-screen-md">
          <CardHeader>
            <div className="flex justify-between items-center">
              <h1 className="text-center font-semibold mt-3  md:text-xl">
                New Proposals
              </h1>
              <Button
                onPressEnd={handleCreateProposal}
                className="bg-pink-500 text-white"
              >
                Create Proposal
              </Button>
            </div>
            <hr />
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-4/5 text-left font-bold">
                    Title
                  </TableHead>
                  {/* <TableHead className="w-1/3 text-center font-bold">
                    Vote Count
                  </TableHead> */}
                  <TableHead className="w-1/5 text-right font-bold">
                    Status
                  </TableHead>
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
                      <TableCell className="w-4/5">
                        <span className=" text-lg font-medium">
                          {proposal.title}
                        </span>{" "}
                        <br /> {proposal.voteCount.toString()} votes
                      </TableCell>
                      {/* <TableCell className="w-1/3 text-center"></TableCell> */}
                      <TableCell className=" w-1/5 text-right">
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
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
