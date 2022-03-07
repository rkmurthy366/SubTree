import React from 'react'
import { useState,useRef } from 'react'
import { ethers } from "ethers";

export default function BuyPlan() {
    const [planId,setPlanId]=useState("");
    

    const contract_address_plan="0x0B306BF915C4d645ff596e518fAf3F9669b97016";
    const ticket_abi=[
        "function buyPlan(uint _planId, uint _tId) external payable",
    ];
   
    async function reqAcct(){
       await window.ethereum.request({method:'eth_requestAccounts'});
     }
     async function getPlanDetail(){
    if (typeof window.ethereum !== 'undefined'){
       await reqAcct()
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const myAddress = await signer.getAddress()
    const contract= new ethers.Contract(contract_address_plan,ticket_abi,signer);
    const data=await contract.buyPlan(planId);
    await data.wait()
   //  await myAddress.wait();
    //console.log(myAddress)
    console.log(planId)
   
    }
   }
  return (
    <div>BuyPlan</div>
  )
}
