import React from 'react'
import { useState,useRef } from 'react'
import { ethers } from "ethers";
export default function CreatePlan() {

  return (
    <div className='gap-3 bg-slate-300 mx-40 flex flex-col rounded shadow-lg'>
        
        <div className='flex flex-row gap-5'>
            <label  >
                Plan Name
            </label>
            <input type="text" />
        </div>
        <div className='flex flex-row '>
            <label>
                Plan Cost
            </label>
            <input type="text" />
        </div>
        <div className='flex flex-row'>
            <label>
                Plan Name
            </label>
            <input type="time" />
        </div>
        <button>
            Create Plan
        </button>
    </div>
  )
}
