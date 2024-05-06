import React from 'react';

const time = '11:11'

const Timer: React.FC = () => {
  return (
    <div className='w-[126px] lg:w-[94px] bg-[#EDEDED] border-[E2E2E2] h-[48px] lg:h-[36px] rounded-[24px] lg:rounded-[18px] text-[2rem] lg:text-[1.5rem] font-primary font-extrabold flex items-center justify-center'>
        {time}
    </div>
  );
};

export default Timer;
