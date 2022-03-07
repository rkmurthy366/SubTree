import React from 'react'
import { useState,useRef } from 'react'
import { ethers } from "ethers";


export default function DeletePlan() {
    const [planId,setPlanId]=useState("");
    

 const contract_address_plan="0x0B306BF915C4d645ff596e518fAf3F9669b97016";
 const ticket_abi=[
     "function deletePlan(uint _planId) public onlyPlanController",
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
 const data=await contract.deletePlan(planId);
 await data.wait()
//  await myAddress.wait();
 //console.log(myAddress)
 console.log(planId)

 }
}
  return (
    <div>DeletePlan</div>
  )
}
