"use client";

import React, { useState, useEffect } from "react";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { contractABI } from '../Contract';

const SmartContract = () => {
  const [newvalue, setNewValue] = useState("0");
  const [numsValue, setNumsValue] = useState("0");
  const [isLoading, setIsLoading] = useState(true);
  const addr = useAddress();
  const contractAddress = "0x514fcDcf53C7aFafdFA9A2aadedf789e0b909D75";

  useEffect(() => {
    if (addr) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      const retrieveValue = async () => {
        const value = await contract.retrieve();
        setNumsValue(value.toNumber());
        setIsLoading(false);
      };

      retrieveValue();
    }
  }, [addr]);

  const handleSetNewValue = async () => {
    if (addr) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      await contract.store(newvalue);
      setNewValue("");
      const value = await contract.retrieve();
      setNumsValue(value.toNumber());
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-950 shadow-inner">
      <div className="bg-black w-max rounded-lg border border-orange-500">
        <div className="flex justify-center p-10">
          <ConnectWallet />
        </div>
        <h1 className="flex justify-center text-white">
          {isLoading ? "Loading..." : numsValue}
        </h1>
        <div className="space-x-10 p-10 flex justify-center">
          {addr && (
            <>
              <input
                type="number"
                placeholder="Enter the Number"
                value={newvalue}
                onChange={(e) => setNewValue(parseInt(e.target.value))}
                className="border py-2 rounded-lg text-center"
              />
              <button
                onClick={handleSetNewValue}
                className="bg-orange-500 text-white px-4 py-2 rounded-lg"
              >
                Set new value
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SmartContract;
