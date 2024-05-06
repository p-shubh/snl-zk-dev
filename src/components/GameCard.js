import React from 'react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { removePrefix } from '../../modules/Utils/ipfsUtil';

const GameCard = ({ game }) => {
  const starttime = game.startTimestamp;
  const gamestartTime = new Date(parseInt(starttime, 10));
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(gamestartTime));

  useEffect(() => {
    // Update the countdown every second
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft(gamestartTime);
      if (newTimeLeft.total <= 0) {
        clearInterval(timer);
      } else {
        setTimeLeft(newTimeLeft);
      }
    }, 1000);

    // Cleanup on component unmount
    return () => clearInterval(timer);
  }, []);

  // Function to calculate the time left until the start time
  function calculateTimeLeft(startTime) {
    const difference = +startTime - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        total: difference,
      };
    } else {
      timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
    }

    return timeLeft;
  }

  return (
    <Link href={`/games/snl/${game?.gameId}`} className='z-10'>
    <div className="border text-black rounded-2xl mt-10 bg-white">
      <div className="w-full">
                    <img
                      alt="alt"
                      src={`${
                        "https://nftstorage.link/ipfs"
                      }/${removePrefix(game?.coverImage)}`}
                      className="rounded-t-2xl"
                      style={{ height: "200px", width: "400px" }}
                    />
                </div>
      <div className="p-4">
        <div>
        <img
          alt="alt"
          src={`${'https://nftstorage.link/ipfs'}/${removePrefix(
            game?.picture
          )}`}
          className="rounded-full border border-black"
          width="100"
          height="100"
        />
        </div>
      
      <div className="mt-4 font-bold">
        <div className="flex justify-between">
        <h5>{game?.name} ({game?.symbol})</h5>
        <div className="bg-green-500 rounded-lg px-4 py-2">Enter game</div>
        </div>
        <p className="mt-2">{game?.description}</p>
        <div className='mt-2'>
          {timeLeft.total > 0 ? (
            <p className=''>
              Time until game starts: <br></br>
              <div className='text-red-500'>
              {timeLeft.days} days, {timeLeft.hours} hrs, {timeLeft.minutes}{' '}
              mins, {timeLeft.seconds} sec
                </div>
            </p>
          ) : (
            <div className="p-2 text-green-500">
                  {/* Ongoing game. */}
            </div>
          )}
        </div>
       
      </div>
    </div>
    </div>
    </Link>
  );
};

export default GameCard;
