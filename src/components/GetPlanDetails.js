import React from 'react'
import { useState,useRef } from 'react'
import { BigNumber, ethers } from "ethers";
import Plan from './../artifacts/contracts/Plan.sol/Plan.json'

export default function GetPlanDetails() {
    const [planId,setPlanId]=useState("");
    

 const contract_address_plan="0x0B306BF915C4d645ff596e518fAf3F9669b97016";
 const ticket_abi=[
     "function getPlanDetails(uint _planId) public view returns (planDetails memory )",
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
 const contract= new ethers.Contract(contract_address_plan,Plan.abi,provider);
 const data=await contract.getPlanDetails(1);
// await data.wait()
//  await myAddress.wait();
 //console.log(myAddress)
 console.log(data)
 //console.log(data[2]._hex)
 data.forEach((element,id) => {
    // console.log(typeof element)
     if(typeof element==="object"){
        console.log(BigNumber.from(data[id]._hex).toNumber())
     }
     if(typeof element==="boolean"){
        console.log(data[id])
     }
     if(typeof element==="string"){
        console.log(data[id])
     }
 });
 BigNumber.from("0x2a");
//console.log(BigNumber.from(data[]._hex).toNumber())


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
                Plan Id
            </label>
            <input onChange={e=>setPlanId(e.target.value)} type="text" />
        </div>
      
   
        <button onClick={getPlanDetail} className='bg-black text-white p-5 shadow-lg mb-10  mx-20  w-30 rounded'>
            Get Plan details
        </button>

        <div className='flex flex-col gap-3 '>
     planId:
    planName:
    planCost:
   planStart:
     planDuration:
     planEnd:
     planValidity:
     planSubscribers:
        </div>

    </div>
  )
}
