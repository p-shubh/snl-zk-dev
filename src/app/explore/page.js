'use client';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import axios from "axios";
import GameCard from '@/components/GameCard';

export default function Dashboard() {

  const [token, settoken] = useState('');
  const [pagestatus, setpagestatus] = useState('snl');
  const [loading, setLoading] = useState(false);
  const [games, setGames] = useState([]);
  const [bgImage, setBgImage] = useState('/bingo1.png');

  useEffect(() => {
    const call = () => {
      const loggedin = Cookies.get('bingo_wallet');
      settoken(loggedin);
    };
    call();
  }, []);

  useEffect(() => {
    setLoading(true);
    const fetchGames = async () => {
      if(pagestatus === 'bingo'){
        try {
        const config = {
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            // Authorization: `Bearer ${auth}`,
          },
        };

        const reviewResults = await axios.get(
          `https://virtuegateway.myriadflow.com/api/v1.0/game/all`,
          config
        );
        console.log("current",reviewResults);
        const reviewsData = await reviewResults.data;

        // Filter games based on pagestatus
      const filteredGames = reviewsData.filter(game => game.type === pagestatus);

      setGames(filteredGames);
      console.log(filteredGames);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    }
    else if(pagestatus === 'memory'){try {
      const config = {
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
          // Authorization: `Bearer ${auth}`,
        },
      };

      const reviewResults = await axios.get(
        `https://virtuegateway.myriadflow.com/api/v1.0/memory/all`,
        config
      );
      console.log("current",reviewResults);
      const reviewsData = await reviewResults.data;

      // Filter games based on pagestatus
    const filteredGames = reviewsData.filter(game => game.type === pagestatus);

    setGames(filteredGames);
    console.log(filteredGames);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  }
  else if(pagestatus === 'snl'){try {
    const config = {
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        // Authorization: `Bearer ${auth}`,
      },
    };

    const reviewResults = await axios.get(
      `https://virtuegateway.myriadflow.com/api/v1.0/snl/all`,
      config
    );
    console.log("current",reviewResults);
    const reviewsData = await reviewResults.data;

    // Filter games based on pagestatus
  const filteredGames = reviewsData.filter(game => game.type === pagestatus);

  setGames(filteredGames);
  console.log(filteredGames);
  } catch (error) {
    console.error('Error fetching reviews:', error);
  }
}
  
  }

    const fetchReviewsData = async () => {
      await fetchGames();
    };
  
    fetchReviewsData().finally(() => setLoading(false));
  }, [pagestatus]);

  

  return (
    <main
      className="flex flex-col items-center justify-between p-24"
      style={{ backgroundImage: `url("${bgImage}")`, backgroundSize: 'cover' }}
    >
      {/* Background div with blur */}
      <div
        style={{
          // filter: 'blur(8px)',
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundSize: 'cover',
          backgroundImage: `url("${bgImage}")`,
          top: 0,
          left: 0,
          zIndex: 0, // Ensure the blur layer is below the content
        }}
      />
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
          <div className="py-2 text-white">SNL</div>
        </Link>
        <div className="text-white fixed gap-4 bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          {token ? (
          <div className="flex gap-4">
            <Link href="/explore"
            className="pointer-events-none flex place-items-center gap-2 lg:pointer-events-auto mb-4"
          >
            <div className="text-lg">Explore</div>
          </Link>
          <Link href="/launch"
            className="pointer-events-none flex place-items-center gap-2 lg:pointer-events-auto mb-4"
          >
            <div className="text-lg">Launch</div>
          </Link>
          {/* <Link href="/dashboard"
            className="pointer-events-none flex place-items-center gap-2 lg:pointer-events-auto mb-4"
          >
            <div className="text-lg">Dashboard</div>
          </Link> */}
          </div>):(
            <div className="flex gap-4">
              <Link href="/explore"
            className="pointer-events-none flex place-items-center gap-2 p-1 lg:pointer-events-auto"
          >
            <div className="text-lg">Explore</div>
          </Link>
          <Link href="/launch"
            className="pointer-events-none flex place-items-center gap-2 p-1 lg:pointer-events-auto"
          >
            <div className="text-lg">Launch</div>
          </Link>
            {/* <Link href="/dashboard"
            className="pointer-events-none flex place-items-center gap-2 p-1 lg:pointer-events-auto"
          >
            <div className="text-lg">Dashboard</div>
          </Link> */}
          </div>
          )}
          <div className="text-center group rounded-lg transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          >
        <Navbar />
        </div>
        </div>
      </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            gap: '1rem',
          }}>
          {loading ? (
            <p>Loading...</p>
          ) : (
            games.map((game, index) => (
              <GameCard key={index} game={game} />
            ))
          )}
        </div>


        {loading && (
        <div
          style={{ backgroundColor: "#222944E5" }}
          className="flex overflow-y-auto overflow-x-hidden fixed inset-0 z-50 justify-center items-center w-full max-h-full"
          id="popupmodal"
        >
          <div className="relative p-4 w-full max-h-full">
            <div className="relative rounded-lg shadow">
              <div className="flex justify-center gap-4">
                <img
                  src="/dice_loader.gif"
                  alt="Loading icon"
                />
              </div>
            </div>
          </div>
        </div>
      )}

    </main>
  );
}
