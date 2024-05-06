// components/CongratulationsModal.tsx
import React from 'react';
import { animated, useSpring } from 'react-spring';
import Stars from '../../public/stars.png';

interface CongratulationsModalProps {
  onClose: () => void;
  snakesNumber: number;
  laddersNumber: number;
}

const CongratulationsModal: React.FC<CongratulationsModalProps> = ({ onClose, snakesNumber, laddersNumber }) => {
  const modalProps = useSpring({
    opacity: 1,
    from: { opacity: 0 },
  });

  const glitterProps = useSpring({
    from: { translateY: -100, opacity: 0 },
    to: { translateY: 0, opacity: 1 },
  });

  const starProps = useSpring({
    from: { scale: 0, opacity: 0 },
    to: { scale: 1, opacity: 1 },
    delay: 1000, // Delay after glitter animation completes
  });

  return (
    <animated.div style={modalProps} className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg flex gap-y-6 justify-center w-[36rem] items-center flex-col text-center relative">
        <h2 className="text-2xl font-bold">Congratulations!</h2>

        {/* Shining star animation */}
        <animated.div
          style={{
            transform: starProps.scale.to((val) => `scale(${val})`),
            opacity: starProps.opacity,
          }}
        >
          <img src={Stars.src} alt="Stars" className='w-[150px] h-[40px]' />
        </animated.div>
        <div>
          <h1 className='font-primary font-semibold'>You had <span className='text-primary font-extrabold'>{snakesNumber}</span> snakes and <span className='text-primary font-extrabold'>{laddersNumber}</span> Ladders</h1>
        </div>

        <p className='text-[12px]'>We will be sending an nft to your address, please be patient.</p>

        <button className="bg-grad hover:bg-gradtrans text-white px-4 py-2 rounded-full" onClick={onClose}>
          Play again
        </button>
      </div>
    </animated.div>
  );
};

export default CongratulationsModal;
