import { Button } from '@nextui-org/react';
import React from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { useRouter } from 'next/navigation';

function Contents() {
    const router = useRouter();

    const handlehome = ()=>{
        router.push("/")
    }
    
    const handleNewProposal = () => {
      router.push("Proposals");
    };
  return (
    <>
      <div className="flex justify-center space-x-2  ">
        <Button onPressEnd={handlehome} className="bg-white shadow-md">
          Home
        </Button>

        <Button onPressEnd={handleNewProposal} className=" bg-white shadow-md">
          New
        </Button>
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
    </>
  );
}

export default Contents
