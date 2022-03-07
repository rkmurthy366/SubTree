import React from 'react'
import Header from '../new-components/Header'
import Footer from './../new-components/Footer'
import Card from '../new-components/Card'
import { BigNumber, ethers } from 'ethers'
import { useState } from 'react'
import Plan from './../artifacts/contracts/Plan.sol/Plan.json'
export default function BuyPlan() {
    const [cardValue,setCardValue]=useState({
     planId:"",
     planName:"",
    planCost:"",
     planStart:"",
     planDuration:"",
    planEnd:"",
     planValidity:"",
    planSubscribers:""
    });
    

    ///////Fetch Plan to card//////
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
 for (let i = 0; i < 4; i++) {
    const data=await contract.getPlanDetails(i);
    data.forEach((element,id) => {
        console.log(typeof element)
         if(typeof element==="object"){
            //console.log(BigNumber.from(data[id]._hex).toNumber())
            console.log(data[id])
         }
         if(typeof element==="boolean"){
            console.log(data[id])
         }
         if(typeof element==="string"){
            console.log(data[id])
         }
     });

    }
    console.log(typeof data)
 
// await data.wait()


 /////////////


 }

}

getPlanDetail()

////////Fetch Plans to Card///////
  return (
      
    <div>
        
        <Header/>
        
            <Card/>
        
        <Footer/>
    </div>
  )
}
