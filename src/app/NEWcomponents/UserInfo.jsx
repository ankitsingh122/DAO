'use client'
import React, { useState } from "react";
import {
  ConnectWallet,
  Web3Button,
  useAddress,
  useContract,
  useContractRead,
} from "@thirdweb-dev/react";

function UserInfo() {
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newContact, setNewContact] = useState("");
  const { contract } = useContract(
    "0xecDc645e86Fa7834983bd1402890CF1dd3050F5F"
  );
  const { data: numsValue, isLoading: isLoadingName } = useContractRead(
    contract,
    "retrieveName"
  );
  const { data: emailValue, isLoading: isLoadingEmail } = useContractRead(
    contract,
    "retrieveEmail"
  );
  const { data: contactValue, isLoading: isLoadingContact } = useContractRead(
    contract,
    "retrieveContactNumber"
  );

  const addr = useAddress();

  const handleSetNewValues = async (contract) => {
    await contract.call("store", [newName, newEmail, newContact]);
    setNewName("");
    setNewEmail("");
    setNewContact("");
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-slate-950">
        <div className="bg-black w-96 rounded-lg border border-orange-500">
          <div className="flex justify-center p-10">
            <ConnectWallet />
          </div>
          <div className=" space-y-5">
            <h1 className="flex justify-center text-white">
              {isLoadingName ? <div className="spinner"></div> : numsValue}
            </h1>
            <h1 className="flex justify-center text-white">
              {isLoadingEmail ? <div className="spinner"></div> : emailValue}
            </h1>
            <h1 className="flex justify-center text-white">
              {isLoadingContact ? (
                <div className="spinner"></div>
              ) : (
                contactValue.toNumber()
              )}
            </h1>
          </div>

          <div className="p-10 flex flex-col space-y-4">
            {addr && (
              <>
                <input
                  type="text"
                  placeholder="New Name"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="border py-2 rounded-lg text-center"
                />
                <input
                  type="text"
                  placeholder="New Email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="border py-2 rounded-lg text-center"
                />
                <input
                  type="text"
                  placeholder="New Contact"
                  value={newContact}
                  onChange={(e) => setNewContact(e.target.value)}
                  className="border py-2 rounded-lg text-center"
                />
                <Web3Button
                  contractAddress="0xecDc645e86Fa7834983bd1402890CF1dd3050F5F"
                  action={handleSetNewValues}
                >
                  Set new value
                </Web3Button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default UserInfo;
