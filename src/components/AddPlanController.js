import React, { useState,useRef } from 'react'
import { ethers } from "ethers";

export default function AddPlanController() {
 const {controllerAddress,setControllerAddress}=useState();

 const contract_address_plan="0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
    const ticket_abi=[
        "function removePlanControllers(address _user) public onlyOwner",
        "function addPlanControllers(address _user) public onlyOwner",
    ];

    async function reqAcct(){
        await window.ethereum.request({method:'eth_requestAccounts'});
      }
      async function addControllers(){
     if (typeof window.ethereum !== 'undefined'){
        await reqAcct()
     const provider = new ethers.providers.Web3Provider(window.ethereum)
     const signer = provider.getSigner()
     const myAddress = await signer.getAddress()
     const contract= new ethers.Contract(contract_address_plan,ticket_abi,signer);
     const data=await contract.addPlanControllers(myAddress);
     await data.wait()
    //  await myAddress.wait();
     console.log(myAddress)

     }

    }
    async function removeControllers(){
        if (typeof window.ethereum !== 'undefined'){
           await reqAcct()
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const myAddress = await signer.getAddress()
        const contract= new ethers.Contract(contract_address_plan,ticket_abi,signer);
        const data=await contract.removePlanControllers(myAddress);
        await data.wait()
       //  await myAddress.wait();
        console.log(myAddress)
   
        }
   
       }
    
 ///get user address
 //get contract details
 //send user address to contract


  return (
    <div className='flex flex-col gap-5'>
        <button onClick={addControllers} className='py-4 rounded shadow-lg mt-20 font-bold px-10  bg-black text-white '>
            Add Address to Plan Contollers
        </button>

        <button onClick={removeControllers} className='py-4 rounded shadow-lg mt-20 font-bold px-10  bg-black text-white '>
            Remove  Address to Plan Contollers
        </button>
    </div>
  )
}
