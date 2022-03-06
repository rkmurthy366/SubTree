import React from 'react'
import { ethers } from "ethers";
 import Web3Modal from "web3modal";
// import WalletLink from "walletlink";
//import WalletConnectProvider from "@walletconnect/web3-provider";

export default function ConnectWallet() {


    // const providerOptions = {
    //     walletconnect: {
    //       package: WalletConnectProvider, // required
    //       options: {
    //         infuraId: "INFURA_ID" // required
    //       }
    //     }
    //   };
      
    //   const web3Modal = new Web3Modal({
    //     providerOptions // required
    //   });
      
    //   async function testWallet(){

    //     const instance = await web3Modal.connect();
    //     const provider = new ethers.providers.Web3Provider(instance);
    //     const signer = provider.getSigner();
    //     console.log(signer)

    //   }
      
      
      
     

  return (
    <div>
     <button >
         Connect Wallet
     </button>

    </div>
  )
}
