import React from 'react';
import { MdAccountCircle } from "react-icons/md";
import { MdOutlineSettings } from "react-icons/md";
import { IoRibbon } from "react-icons/io5";

const Menu: React.FC = () => {
  return (
    <div className='bg-[#FBFBFB] w-[20rem] h-[10rem] border border-[#E2E2E2] px-[0.6rem] py-[0.9rem] lg:py-[0.675rem] rounded-[1rem] lg:rounded-[0.75rem]'>
        <p className='text-[10px] font-semibold justify-center flex'>0xb2Aa3EC23CAeaD39442cecaffDEA4240A1D448E5</p>

        <div className='mt-4'>
          <div className='h-9 w-full border-b border-[#E2E2E2] items-center gap-x-1 flex'>
            <MdAccountCircle className='w-[1.5rem] h-[1.5rem]' />
            <p className='text-[1rem] font-normal font-primary'>My Account</p>
          </div>
          <div className='h-9 w-full border-b border-[#E2E2E2] items-center gap-x-1 flex'>
            <MdOutlineSettings className='w-[1.5rem] h-[1.5rem]' />
            <p className='text-[1rem] font-normal font-primary'>Settings</p>
          </div>
          <div className='h-9 w-full border-b border-[#E2E2E2] items-center gap-x-1 flex'>
            <IoRibbon className='w-[1.5rem] h-[1.5rem]' />
            <p className='text-[1rem] font-normal font-primary'>My Achievements</p>
          </div>
        </div>
    </div>
  )
}

export default Menu
