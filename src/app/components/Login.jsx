"use client";

import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { loginABI } from "../LoginAbi";
import {
  useAddress,
  ConnectWallet,
  useSigner,
} from "@thirdweb-dev/react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const [registerMessage, setRegisterMessage] = useState("");
  const [contract, setContract] = useState(null);
  const signer = useSigner();
  const contractAddress = "0xd9267265F97a5249272F84Ea418510750B91bA89";

  useEffect(() => {
    if (signer) {
      const _contract = new ethers.Contract(contractAddress, loginABI, signer);
      setContract(_contract);
    }
  }, [signer]);

  const handleRegister = async () => {
    if (contract) {
      try {
        const tx = await contract.register(username, password);
        await tx.wait();
        setRegisterMessage("Registration successful!");
      } catch (error) {
        console.error(error);
        setRegisterMessage("Registration failed. Please try again.");
      }
    }
  };

  const handleLogin = async () => {
    if (contract) {
      try {
        const isLoginSuccessful = await contract.login(username, password);
        if (isLoginSuccessful) {
          setLoginMessage("Login successful!");
        } else {
          setLoginMessage("Login failed. Invalid username or password.");
        }
      } catch (error) {
        console.error(error);
        setLoginMessage("Login failed. Please try again.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-950 shadow-inner">
      <div className="bg-black w-max rounded-lg border border-orange-500 p-10">
        <div className="flex justify-center pb-5">
          <ConnectWallet />
        </div>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border py-2 rounded-lg text-center w-full"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border py-2 rounded-lg text-center w-full"
          />
          <div className="flex justify-between">
            <button
              onClick={handleRegister}
              className="bg-green-500 text-white px-4 py-2 rounded-lg"
            >
              Register
            </button>
            <button
              onClick={handleLogin}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Login
            </button>
          </div>
          {registerMessage && <p className="text-white">{registerMessage}</p>}
          {loginMessage && <p className="text-white">{loginMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default Login;
