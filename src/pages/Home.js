import React from 'react'
import Header from '../new-components/Header'
import Footer from './../new-components/Footer'
import { ethers } from 'ethers'
export const Home = () => {
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
       try {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract= new ethers.Contract(contract_address_ticket,ticket_abi,signer);
        const data=await contract.register();
        await data.wait()
         
       } catch (error) {
         console.log({
           message:error
         })
       }
        await reqAcct()
    
     }

    }

  
  return (
    <>
       
       <div>
         <Header/>
        
<div class="flex flex-wrap md items-center h-screen">
      <div class="bg-white w-full md:w-1/2 h-screen">
        <div class="mx-32">
          <h1 class="text-6xl font-bold mt-16">Welcome to DinoLabs</h1>

         
          <div class="flex mt-16 font-light text-gray-500">
            <div class="pr-4">
              <span class="uppercase">Who we are?</span>
              <p class="text-2xl text-gray-900 font-semibold pt-2">Get your Decentralized Ticket/Plan Subcription Platform</p>
            </div>
          </div>

         
          <div
            class="description w-full sm: md:w-2/3 mt-16 text-gray-500 text-sm"
          >
            Tokyo, Japan’s busy capital, mixes the ultramodern and the
            traditional, from neon-lit skyscrapers to historic temples. The
            opulent Meiji Shinto Shrine is known for its towering gate and
            surrounding woods. The Imperial Palace sits amid large public
            gardens
          </div>

          <button class="uppercase mt-5 text-sm font-semibold hover:underline">
            read more
          </button>
        </div>
      </div>
      <div class="bg-red-600 w-full md:w-1/2 h-screen">
        <img
          src="https://source.unsplash.com/7H77FWkK_x4/1600x900"
          class="h-screen w-full"
          alt=""
        />
      </div>
    </div>
    
<div class="flex bg-gray-100 py-24 justify-center">
    <div class="p-12 text-center max-w-2xl">
        <div class="md:text-3xl text-3xl font-bold">Try Us out ?</div>
        <div class="text-xl font-normal mt-4">Get Your Ticket 
        </div>
        <div class="mt-6 flex justify-center h-12 relative">
            <div onClick={RegisterAddress} class="flex shadow-md font-medium absolute py-2 px-4 text-green-100
        cursor-pointer bg-gray-800 rounded text-lg tr-mt  svelte-jqwywd">Register</div>
        </div>
    </div>
</div>
      <Footer/>
  
       </div>

       </>
    
     

   
  )
}
