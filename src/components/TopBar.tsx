import React from 'react';
import Profile from './Profile';
import Timer from './Timer';
import Image from 'next/image';

export interface TopBarProps {
  onProfClick: () => void;
}

const TopBar: React.FC<TopBarProps> = () => {
  return (
    <div className="w-full bg-[#eaeaea26] h-[4.75rem] lg:h-[3.5625rem] px-[5.5rem] lg:px[4.125rem] items-center justify-center flex">
      <div className="flex w-full items-center justify-between">
        <div className="items-center gap-x-1 justify-center flex">
          <Image
            alt="virtueQuest"
            src="/logo.svg"
            className="w-[3.75rem] h-[3.75rem] flex lg:h-[2.8125rem] lg:w-[2.8125rem] rounded-[0.9375rem]"
          />
          <div className="flex flex-col justify-center">
            <h1 className="font-primary text-black text-[20px] lg:text-[18px] leading-3 font-bold">
              VirtueQuest
            </h1>
            <p className="text-[12px] lg:text-[10px] leading-2">
              Cybersecurity Journey
            </p>
          </div>
        </div>

        <Timer />
        <Profile />
      </div>
    </div>
  );
};

export default TopBar;
