"use client";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import axios from "axios";
import GameBoard from '@/components/Board';
import { useSearchParams } from 'next/navigation';
const envcollectionid = "0xdb814ad6dcacad6d1e1caa459b2363047fecc37cd5cdd848d0e3775a65e54792";
const graphqlaptos = "https://indexer-randomnet.hasura.app/v1/graphql";

export default function Bingo({ params }) {
  const id = params?.id;

  const searchParams = useSearchParams();
  const gameData = searchParams.get('gameData')

  const [token, settoken] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const call = () => {
      const loggedin = Cookies.get("snl_wallet");
      settoken(loggedin);
    };
    call();
  }, []);

  const blurbackground = {
    backgroundImage: 'linear-gradient(to bottom, #7AB2B2, #4D869C)',
  }

  return (
    <>
    <div className="z-10 w-full flex">
      <div className="z-10 w-full" style={{backgroundColor:'#C5FFF8'}}>
        <header>
    <nav class="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <Link href="/" class="flex items-center">
                <img src="/bingo_lion2.png" class="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
                <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">SNL</span>
            </Link>
            <div class="flex items-center lg:order-2">
                <Navbar/>
                <button data-collapse-toggle="mobile-menu-2" type="button" class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
                    <span class="sr-only">Open main menu</span>
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                    <svg class="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </button>
            </div>
            <div class="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1 z-10" id="mobile-menu-2">
                <ul class="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                    <li>
                    <Link href="/explore" class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Explore</Link>
                    </li>
                    <li>
                        <Link href="/launch" class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Launch</Link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</header>
      </div>
      </div>

    <main
      className="flex min-h-screen flex-col items-center justify-between py-10"
      style={{ backgroundImage: 'url("/bggame.png")', backgroundSize: "cover" }}
    >
      <div className="z-10">
        <GameBoard gameData={gameData} objectid={id}/>
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
    </>
  );
}
