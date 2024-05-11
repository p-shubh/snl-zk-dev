"use client";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import axios from "axios";
import GameBoard from '@/components/Board';
const envcollectionid = "0xdb814ad6dcacad6d1e1caa459b2363047fecc37cd5cdd848d0e3775a65e54792";
const graphqlaptos = "https://indexer-randomnet.hasura.app/v1/graphql";

export default function Bingo({ params }) {
  const id = params?.id;

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
      <div className="z-10 w-full items-center justify-between font-mono text-sm flex lg:px-60 py-1" style={{backgroundColor:'#C5FFF8'}}>
        <Link
          href="/"
          className="gap-2 left-0 top-0 flex w-full justify-center font-bold backdrop-blur-2xl dark:from-inherit static w-auto p-2"
        >
          <img
            src="/bingo_lion2.png"
            style={{ width: 40 }}
            className="rounded-lg"
          />
          <div className="py-2 text-xl">SNL</div>
        </Link>
        <div className="gap-4 top-0 right-0 flex w-full items-end justify-center static w-auto">
          {token ? (
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
            </div>
          )}
          <div className="text-center group rounded-lg transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
            <Navbar />
          </div>
        </div>
      </div>
      </div>

    <main
      className="flex min-h-screen flex-col items-center justify-between p-10"
      style={{ backgroundImage: 'url("/snake1.png")', backgroundSize: "cover" }}
    >
      {/* Background div with blur */}
      <div
        style={{
          // filter: "blur(8px)",
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundSize: "cover",
          backgroundImage: 'url("/snake1.png")',
          top: 0,
          left: 0,
          zIndex: 0, // Ensure the blur layer is below the content
        }}
      />
      <div className="z-10 backdrop-blur-2xl p-10 rounded-2xl" style={blurbackground}>
        <GameBoard />
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
