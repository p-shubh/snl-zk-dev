'use client';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Zoom } from 'react-reveal';

export default function Home() {
  const [wallet, setwallet] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);

  useEffect(() => {
    const call = () => {
      const loggedin = Cookies.get('bingo_wallet');
      setwallet(loggedin);
    };
    call();
  }, []);

  const [scrollDirection, setScrollDirection] = useState('down');
  const [prevScrollY, setPrevScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > prevScrollY) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }

      setPrevScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollY]);

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-between p-24"
      style={{
        backgroundImage:
          'radial-gradient(circle at bottom left, #040819 10%, #0162FF 40% , #1D73FF, #5696FF, #8EB9FF, #AACBFF)',
      }}
    >
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <Link
          href="/"
          className="gap-2 fixed left-0 top-0 flex w-full justify-center font-bold border-b border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:p-2 lg:dark:bg-zinc-800/30"
        >
          <img
            src="/bingo_lion2.png"
            style={{ width: 40 }}
            className="rounded-lg"
          />
          <div className="py-2">VirtueGaming</div>
        </Link>
        <div className="fixed gap-4 bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          {wallet ? (
            <div className="flex gap-4">
              <Link
                href="/explore"
                className="pointer-events-none flex place-items-center gap-2 lg:pointer-events-auto mb-4"
              >
                <div className="text-lg">Explore</div>
              </Link>
              <Link
                href="/launch"
                className="pointer-events-none flex place-items-center gap-2 lg:pointer-events-auto mb-4"
              >
                <div className="text-lg">Launch</div>
              </Link>
              {/* <Link
                href="/dashboard"
                className="pointer-events-none flex place-items-center gap-2 lg:pointer-events-auto mb-4"
              >
                <div className="text-lg">Dashboard</div>
              </Link> */}
            </div>
          ) : (
            <div className="flex gap-4">
              <Link
                href="/explore"
                className="pointer-events-none flex place-items-center gap-2 p-1 lg:pointer-events-auto"
              >
                <div className="text-lg">Explore</div>
              </Link>
              <Link
                href="/launch"
                className="pointer-events-none flex place-items-center gap-2 p-1 lg:pointer-events-auto"
              >
                <div className="text-lg">Launch</div>
              </Link>
              {/* <Link
                href="/dashboard"
                className="pointer-events-none flex place-items-center gap-2 p-1 lg:pointer-events-auto"
              >
                <div className="text-lg">Dashboard</div>
              </Link> */}
            </div>
          )}
          <div className="text-center group rounded-lg border border-gray-300 px-2 py-2 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
            <Navbar />
          </div>
        </div>
      </div>

      <div className="flex justify-between gap-20 my-20">
        {/* <div
          style={{ transform: 'rotate(-15deg)' }}
          onMouseEnter={() => setIsHovered2(true)}
          onMouseLeave={() => setIsHovered2(false)}
          className={`pb-2 border border-gray-500 rounded-3xl transition-transform duration-300 ${
            isHovered2
              ? 'transform scale-125 shadow-2xl'
              : 'transform scale-110 shadow-lg'
          }`}
        >
          <Link href="/explore">
            <Image
              src="/bingo2.png"
              width={300}
              height={300}
              className="rounded-t-3xl"
            />
            <div className="text-center text-white mx-auto text-xl py-4">
              BINGO
            </div>
            <div className="text-center text-white text-xs">
              A number calling game styled as a slow casino. <br></br>Now play
              bingo on the blockchain.
            </div>
          </Link>
        </div> */}
        <div className='my-auto'>
          <div className="text-6xl text-white font-bold mb-10 text-center">
            VirtueGaming
          </div>
          <div className="text-center text-white">
            Onchain game platform to mint your own nft and earn APTs.<br></br>
            Now play games on the blockchain.
          </div>
          {/* {wallet ? (
          <></>
        ) : (
          <div className="mx-auto text-center group rounded-lg border border-transparent flex justify-center mt-10 w-1/2 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
        <Navbar />
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
        </div>
        )} */}
        </div>
        <div
          // style={{ transform: 'rotate(15deg)' }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`pb-2 border border-gray-500 rounded-3xl transition-transform duration-300 ${
            isHovered
              ? 'transform scale-125 shadow-2xl'
              : 'transform scale-110 shadow-lg'
          }`}
        >
          <Link href="/explore">
            <Image
              src="/snake1.png"
              width={300}
              height={300}
              className="rounded-t-3xl"
            />
            <div className="text-center text-white mx-auto text-xl py-4">
              SNAKE N LADDER
            </div>
            <div className="text-center text-white text-xs">
              Discover something new and receive an <br></br>NFT to show off
              your achievement.
            </div>
          </Link>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center min-h-screen text-white mt-40 max-w-5xl">
        <Zoom when={scrollDirection === 'down'}>
          <h1 className="text-5xl font-bold mb-8">
            Unleash Your Competitive Spirit
          </h1>
          <div className="text-2xl font-bold mb-8">
            Launch and Play Board Games with Ease!
          </div>
          </Zoom>

          <div id="features" className="mt-16 flex gap-10">
          {/* Your feature sections here */}
          <div className="w-1/2 text-xl">
            <div className="rounded-2xl px-10 py-20 border text-black font-bold" 
            style={{
        backgroundImage:
          'radial-gradient(circle at top left, #F7418F 10%, #FFF3C7 40% , #1D73FF, #FC819E, #FEC7B4, #FFF3C7)',
      }}>
              Game Launch Platform<br></br>
              <div className='text-lg w-2/3 font-semibold mt-4'>Provide a platform for game creators to launch their board games, including features for uploading game files, descriptions, images.</div>
            </div>
            <div className="rounded-2xl px-10 py-20 border mt-10 text-black font-bold" 
            style={{
              backgroundImage:
                'radial-gradient(circle at bottom right, #F7418F 10%, #FFF3C7 40% , #1D73FF, #FC819E, #FEC7B4, #FFF3C7)',
            }}>
              Online Multiplayer<br></br>
              <div className='text-lg w-2/3 font-semibold mt-4'>Enable users to play board games with friends or other players online, supporting multiplayer functionality for various games.</div>

            </div>
          </div>
          <Zoom when={scrollDirection === 'down'}>
          <div className="w-1/2 rounded-2xl px-60 py-80 border" 
          style={{backgroundImage: "url('/bingo-win.gif')"}}
          >
          </div>
          </Zoom>
        </div>
        

        
      </div>
    </main>
  );
}
