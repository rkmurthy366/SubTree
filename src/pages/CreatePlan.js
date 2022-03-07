import React from 'react'
import Footer from '../new-components/Footer'
import Header from '../new-components/Header'
import { useState } from 'react';
import { ethers } from 'ethers';

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
  return (
    <div>
       <Header/>
<div class="h-screen bg-indigo-100 flex justify-center items-center">
	<div class="lg:w-2/5 md:w-1/2 w-2/3">
		<div class="bg-white p-10 rounded-lg shadow-lg min-w-full">
			<h1 class="text-center text-2xl mb-6 text-gray-600 font-bold font-sans">Create Plan</h1>
			<div>
				<label class="text-gray-800 font-semibold block my-3 text-md" for="username">Plan Name</label>
				<input  onChange={e=>setName(e.target.value)} class="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none" type="text" name="username" id="username" placeholder="username" />
      </div>
				<div>
					<label class="text-gray-800 font-semibold block my-3 text-md" for="email">Plan Cost </label>
					<input  onChange={e=>setCost(e.target.value)} class="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none" type="text" name="email" id="email" placeholder="@email" />
      </div>
					<div>
						<label class="text-gray-800 font-semibold block my-3 text-md" for="password">Plan Time</label>
						<input  onChange={e=>setTime(e.target.value)} class="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none" type="text" name="password" id="password" placeholder="password" />
      </div>
							
							<button onClick={createPlan} type="submit" class="w-full mt-6 mb-3 bg-indigo-100 rounded-lg hover:text-white hover:bg-gray-800 px-4 py-2 text-lg text-gray-800 tracking-wide font-semibold font-sans">Create Plan</button>
		</div>
	</div>
</div>
<Footer/>
    </div>
  )
}
