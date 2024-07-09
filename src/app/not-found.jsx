'use client'
import { Button, Tooltip } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function NotFound() {
    const router = useRouter();
    const handleError = ()=>{
        router.push("/")
    }
  return (
    <>
      <div className="flex justify-center mt-10 ">
        <Tooltip
          content={
            <div className="px-1 py-2">
              <div className="text-small font-bold">Custom Content</div>
              <div className="text-tiny">This is a custom tooltip content</div>
            </div>
          }
        >
     
            <Button onPressEnd={handleError} variant="bordered">Hover me</Button>
      
        </Tooltip>
      </div>
    </>
  );
}
