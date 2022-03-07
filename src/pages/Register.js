import React from "react";
import { ethers } from "ethers";
import Ticket from "./../artifacts/contracts/Ticket.sol/Ticket.json"
export default function Register() {
    const contract_address_ticket="0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const ticket_abi=[
        "event registerEvent(address _addresss, uint indexed _tId);",
        " function register() public",
    ];

    async function reqAcct(){
        await window.ethereum.request({method:'eth_requestAccounts'});
      }
      async function RegisterAddress(){
     if (typeof window.ethereum !== 'undefined'){
        await reqAcct()
     const provider = new ethers.providers.Web3Provider(window.ethereum)
     const signer = provider.getSigner()
     const contract= new ethers.Contract(contract_address_ticket,ticket_abi,signer);
     const data=await contract.register();
     await data.wait()
     }

    }
  return (
    <>
      
    </>
  );
}