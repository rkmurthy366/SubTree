import React from 'react'
import { useState,useRef } from 'react'
import { ethers } from "ethers";

export default function CreateSpecialPlan() {
    const [cost,setCost]=useState("");
    const [name,setName]=useState("");
    const [timeStart,setTimeStart]=useState("");
    const [timeDuration,setTimeDuration]=useState("");
    const [timeEnd,setTimeEnd]=useState("");

 const contract_address_plan="0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
 const ticket_abi=[
     "event createPlanEvent(uint indexed _planId, string _planName, uint _planCost, uint _planDuration);",
     "function createSpecialPlan(string calldata _planName, uint _planCost, uint _planStart, uint _planDuration, uint _planEnd) public onlyPlanController",
 ];

 async function reqAcct(){
    await window.ethereum.request({method:'eth_requestAccounts'});
  }
  async function createSpecialPlan(){
 if (typeof window.ethereum !== 'undefined'){
    await reqAcct()
 const provider = new ethers.providers.Web3Provider(window.ethereum)
 const signer = provider.getSigner()
 const myAddress = await signer.getAddress()
 const contract= new ethers.Contract(contract_address_plan,ticket_abi,signer);
 const data=await contract.createSpecialPlan(name,cost,timeStart,timeDuration,timeEnd);
 await data.wait()
//  await myAddress.wait();
 console.log(myAddress)

 }

}


    // function getCreatePlanInfo(){
    //     console.log(name)
    //     console.log(time,cost)
        
    // }

  return (
    <div className='gap-3 bg-slate-300 mx-40 flex flex-col mt-20 pl-20 rounded shadow-lg'>
        
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
                Plan Time Start
            </label>
            <input onChange={e=>setTimeStart(e.target.value)} type="text" />
        </div>
        <div className='flex flex-row gap-5'>
            <label>
                Plan Time Duration
            </label>
            <input onChange={e=>setTimeDuration(e.target.value)} type="text" />
        </div>
        <div className='flex flex-row gap-5'>
            <label>
                Plan Time End
            </label>
            <input onChange={e=>setTimeEnd(e.target.value)} type="text" />
        </div>

        <button onClick={createSpecialPlan} className='bg-black text-white p-5 shadow-lg mb-10  mx-20  w-30 rounded'>
            Create Plan
        </button>

    </div>
  )
}
