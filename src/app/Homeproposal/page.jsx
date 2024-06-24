"use client";
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
import { ConnectWallet } from "@thirdweb-dev/react";



export default function HomeProposal() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <header className="w-full  flex justify-between items-center p-4 bg-white shadow-md">
        <div className="flex items-center">
          <LogInIcon className="h-8 w-8 text-pink-500" />
        </div>
        {/* <Button variant="outline" className="text-pink-500 border-pink-500">
          Connect wallet
        </Button> */}
        <ConnectWallet />
      </header>
      <main className="flex flex-col items-center w-full max-w-4xl mt-8 space-y-8">
        <div className="flex justify-center space-x-2">
          <Button variant="outline">Home</Button>
          <Link href="/Proposals">
            <Button variant="outline">New</Button>
          </Link>
        </div>
        <Card className="mx-auto w-full max-w-screen-md text-center">
          <CardHeader>
            <CardTitle>Creating a Proposal</CardTitle>
            <CardDescription>
              On Fish.vote, anyone can publish a{" "}
              <Link
                href="#"
                className="text-blue-500 underline"
                prefetch={false}
              >
                Crowd Proposal
              </Link>
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
              <Link href="/Proposals">
                {" "}
                <CardDescription className="text-center mt-5 text-red-500 ">
                  Read new proposals
                </CardDescription>
              </Link>
              <Button className="bg-pink-500 text-white mt-5">
                Create Proposal
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <Table>
              <TableBody>
                {/* <TableRow>
                  <TableCell className="flex flex-col">
                    <span>
                      Reduce the UNI proposal submission threshold to 2.5M
                    </span>
                    <span className="text-sm text-gray-500">4.4 votes</span>
                  </TableCell>
                  <TableCell className="flex items-center">
                    <Badge
                      variant="default"
                      className="bg-green-500 text-white"
                    >
                      Proposed
                    </Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="flex flex-col">
                    <span>
                      Uniswap DAO can help 80K UNI to Turkiye for relief after
                      the big earthquake disaster
                    </span>
                    <span className="text-sm text-gray-500">1.2 votes</span>
                  </TableCell>
                  <TableCell className="flex items-center">
                    <Badge
                      variant="default"
                      className="bg-yellow-500 text-white"
                    >
                      In Progress
                    </Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="flex flex-col">
                    <span>Create a NFT Farm -- Stake UNI and earn NFTs</span>
                    <span className="text-sm text-gray-500">1 vote</span>
                  </TableCell>
                  <TableCell className="flex items-center">
                    <Badge
                      variant="default"
                      className="bg-yellow-500 text-white"
                    >
                      In Progress
                    </Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="flex flex-col">
                    <span>Help to Support GNSH project</span>
                    <span className="text-sm text-gray-500">0 votes</span>
                  </TableCell>
                  <TableCell className="flex items-center">
                    <Badge
                      variant="default"
                      className="bg-yellow-500 text-white"
                    >
                      In Progress
                    </Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="flex flex-col">
                    <span>UniCred</span>
                    <span className="text-sm text-gray-500">0 votes</span>
                  </TableCell>
                  <TableCell className="flex items-center">
                    <Badge
                      variant="default"
                      className="bg-yellow-500 text-white"
                    >
                      In Progress
                    </Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="flex flex-col">
                    <span>
                      Uniswap pools are already been used as scam. protection
                      tools suggestions
                    </span>
                    <span className="text-sm text-gray-500">0 votes</span>
                  </TableCell>
                  <TableCell className="flex items-center">
                    <Badge
                      variant="default"
                      className="bg-yellow-500 text-white"
                    >
                      In Progress
                    </Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="flex flex-col">
                    <span>The Next Uniswap Airdrop</span>
                    <span className="text-sm text-gray-500">0 votes</span>
                  </TableCell>
                  <TableCell className="flex items-center">
                    <Badge
                      variant="default"
                      className="bg-yellow-500 text-white"
                    >
                      In Progress
                    </Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="flex flex-col">
                    <span>The Next Uniswap Airdrop</span>
                    <span className="text-sm text-gray-500">0 votes</span>
                  </TableCell>
                  <TableCell className="flex items-center">
                    <Badge
                      variant="default"
                      className="bg-yellow-500 text-white"
                    >
                      In Progress
                    </Badge>
                  </TableCell>
                </TableRow> */}
              </TableBody>
            </Table>
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
