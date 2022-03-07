import React from 'react'
import { useState,useRef } from 'react'
import { ethers } from "ethers";

export default function CreatePlan() {
    const [cost,setCost]=useState("");
    const [name,setName]=useState("");
    const [time,setTime]=useState("");

 const contract_address_plan="0x0B306BF915C4d645ff596e518fAf3F9669b97016";
 const ticket_abi=[
     "event createPlanEvent(uint indexed _planId, string _planName, uint _planCost, uint _planDuration);",
     "function createPlan(string calldata _planName, uint _planCost, uint _planDuration) public onlyPlanController",
 ];

 async function reqAcct(){
    await window.ethereum.request({method:'eth_requestAccounts'});
  }
  async function createPlan(){
 if (typeof window.ethereum !== 'undefined'){
    await reqAcct()
 const provider = new ethers.providers.Web3Provider(window.ethereum)
 const signer = provider.getSigner()
 const myAddress = await signer.getAddress()
 const contract= new ethers.Contract(contract_address_plan,ticket_abi,signer);
 const data=await contract.createPlan(name,cost,time);
 await data.wait()
//  await myAddress.wait();
 console.log(myAddress)

 }

}


    function getCreatePlanInfo(){
        console.log(name)
        console.log(time,cost)
        
    }

  return (
    <div className='gap-3 bg-slate-300 mx-40 flex flex-col mt-20 rounded shadow-lg'>
        
        <div className='flex flex-row gap-5 pt-10'>
            <label>
                Plan Name
            </label>
            <input onChange={e=>setName(e.target.value)} type="text" />
        </div>
        <div className='flex flex-row gap-5 '>
            <label>
                Plan Cost
            </label>
            <input onChange={e=> setCost(e.target.value)} type="text" />
        </div>
        <div className='flex flex-row gap-5'>
            <label>
                Plan Time
            </label>
            <input onChange={e=>setTime(e.target.value)} type="text" />
        </div>

        <button onClick={createPlan} className='bg-black text-white p-5 shadow-lg mb-10  mx-20  w-30 rounded'>
            Create Plan
        </button>

    </div>
  )
}
