'use client'
import SmartContract from './components/SmartContract'
import { ThirdwebProvider, metamaskWallet } from "@thirdweb-dev/react";
import UserInfo from './components/UserInfo';
import Login from './components/Login';

const HomePage = () => {
  return (
    <ThirdwebProvider
      supportedWallets={[
        metamaskWallet({
          recommended: true,
        }),
      ]}
      clientId="263ce4ddd19e94c4f99551c0effead31"
      activeChain="sepolia"
    >
      <div>
        <SmartContract />
       <UserInfo/>
       <Login/>
      </div>
    </ThirdwebProvider>
  );
};

export default HomePage;
