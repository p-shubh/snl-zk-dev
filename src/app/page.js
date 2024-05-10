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
      const loggedin = Cookies.get('snl_wallet');
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
    <>
    <div style={{backgroundColor:'#C5FFF8'}} className="w-full items-center justify-center flex py-1">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <Link
          href="/"
          className="gap-2 fixed left-0 top-0 flex w-full justify-center font-bold backdrop-blur-2xl dark:from-inherit lg:static lg:w-auto lg:p-2"
        >
          <img
            src="/bingo_lion2.png"
            style={{ width: 40 }}
            className="rounded-lg"
          />
          <div className="py-2 text-xl">SNL</div>
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
          <div className="text-center group rounded-lg transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
            <Navbar />
          </div>
        </div>
      </div>
      </div>

    <main
      className="flex min-h-screen flex-col items-center justify-between p-20"
      style={{
        backgroundImage:
          'radial-gradient(circle at bottom left, #040819 10%, #0162FF 40% , #1D73FF, #5696FF, #8EB9FF, #AACBFF)',
      }}
    >
      

      <div className="flex justify-between gap-20 my-10">
        <div className='my-auto'>
          <div className="text-6xl text-white font-bold mb-10 text-center">
          SNL
          </div>
          <div className="text-center text-white">
            Onchain game platform to experience the classic Snake and <br></br>
            Ladder game reimagined for modern learning, with dynamic <br></br>
            content integration for an engaging educational journey.
          </div>
        </div>
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`pb-8 border border-gray-500 rounded-3xl transition-transform duration-300 ${
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
          <div className="w-1/2 text-lg">
            <div className="rounded-2xl px-4 py-4 text-black" 
            style={{
        backgroundImage:
          'radial-gradient(circle at top left, #F7418F 10%, #FFE6E6 40%)',
      }}>
              <div className='font-bold text-end' style={{color: '#F7418F'}}>Dynamic Learning Experience</div>
              <div className='w-4/5 mt-4 text-end flex ml-auto' style={{fontSize:16}}>Whether you're ascending ladders or descending snakes, each interaction with the board presents a new opportunity to absorb valuable information.</div>
            </div>
            <div className="rounded-2xl px-4 py-4 mt-6 text-black" 
            style={{
              backgroundImage:
                'radial-gradient(circle at bottom right, #5AB2FF 10%, #FFE6E6 40%)',
            }}>
              <div className='font-bold' style={{color: '#8576FF'}}>Personalized Learning Path</div>
              <div className='w-4/5 mt-4' style={{fontSize:16}}>Customize your learning path with our JSON file upload feature, ensuring an educational and entertaining journey awaits.</div>

            </div>

            <div className="rounded-2xl px-4 py-4 mt-6 text-black" 
            style={{
              backgroundImage:
                'radial-gradient(circle at top left, #AD88C6 10%, #FFE6E6 40%)',
            }}>
              <div className='font-bold text-end' style={{color: '#86469C'}}>Educational Content Integration</div>
              <div className='w-4/5 mt-4 text-end flex ml-auto' style={{fontSize:16}}>Whether its tackling challenging questions or delving into informative topics, every step you take on the board brings you closer to enhancing your understanding.</div>

            </div>
          </div>
          <Zoom when={scrollDirection === 'down'}>
          <div className="w-1/2 rounded-2xl px-60 py-60" 
          style={{backgroundImage: "url('/diceroll.gif')", backgroundRepeat:'no-repeat', backgroundSize:'cover', backgroundPosition:'center'}}
          >
          </div>
          </Zoom>
        </div>
        

        
      </div>
    </main>
    </>
  );
}
