'use client'
import SmartContract from './NEWcomponents/SmartContract'
import { ThirdwebProvider, metamaskWallet } from "@thirdweb-dev/react";
import UserInfo from './NEWcomponents/UserInfo';
import Login from './NEWcomponents/Login';

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
      <Login/>
      </div>
    </ThirdwebProvider>
  );
};

export default HomePage;
