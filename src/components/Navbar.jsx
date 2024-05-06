"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Link from "next/link";
import { animated, useSpring } from 'react-spring';

import { generateNonce, generateRandomness } from "@mysten/zklogin";
import { useSui } from "../components/hooks/useSui";
import { useLayoutEffect } from "react";
import { Ed25519Keypair } from "@mysten/sui.js/keypairs/ed25519";
import jwt_decode from "jwt-decode";
import { fromB64 } from "@mysten/bcs";
import {
  decodeSuiPrivateKey,
} from "@mysten/sui.js/cryptography";
import {
  jwtToAddress,
} from "@mysten/zklogin";
import { TransactionBlock } from "@mysten/sui.js/transactions";

const REACT_APP_GATEWAY_URL = "https://gateway.netsepio.com/";

const Navbar = () => {
  const wallet = Cookies.get("bingo_wallet");

  const [hovered, setHovered] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [loginbox, setloginbox] = useState(false);

  const [userAddress, setUserAddress] = useState(null);
  const [jwtEncoded, setJwtEncoded] = useState(null);
  const [subjectID, setSubjectID] = useState(null);
  const [userSalt, setUserSalt] = useState(null);
  const [userBalance, setUserBalance] = useState(0);

  const modalProps = useSpring({
    opacity: 1,
    from: { opacity: 0 },
  });

  const logout = {
    color: hovered ? "red" : "grey",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getRandomNumber = () => Math.floor(Math.random() * 1000);
        const apiUrl = `https://api.multiavatar.com/${getRandomNumber()}`;

        const response = await axios.get(apiUrl);
        const svgDataUri = `data:image/svg+xml,${encodeURIComponent(response.data)}`;
        setAvatarUrl(svgDataUri);
      } catch (error) {
        console.error('Error fetching avatar:', error.message);
      }
    };

    fetchData();
  }, []);

  const handleDeleteCookie = () => {
    Cookies.remove("bingo_wallet");
    window.location.href = "/";
  };

  // --------------------------------------------------- zklogin login button -----------------------------------------------------------------

  const { suiClient } = useSui();

  async function prepareLogin() {
    const { epoch, epochDurationMs, epochStartTimestampMs } = await suiClient.getLatestSuiSystemState();

    const maxEpoch = parseInt(epoch) + 2; // this means the ephemeral key will be active for 2 epochs from now.
    const ephemeralKeyPair = new Ed25519Keypair();
    const ephemeralPrivateKeyB64 = ephemeralKeyPair.getSecretKey();

    const ephemeralPublicKey = ephemeralKeyPair.getPublicKey();
    const ephemeralPublicKeyB64 = ephemeralPublicKey.toBase64();

    const jwt_randomness = generateRandomness();
    const nonce = generateNonce(ephemeralPublicKey, maxEpoch, jwt_randomness);

    console.log("current epoch = " + epoch);
    console.log("maxEpoch = " + maxEpoch);
    console.log("jwt_randomness = " + jwt_randomness);
    console.log("ephemeral public key = " + ephemeralPublicKeyB64);
    console.log("nonce = " + nonce);

    const userKeyData = {
      randomness: jwt_randomness.toString(),
      nonce: nonce,
      ephemeralPublicKey: ephemeralPublicKeyB64,
      ephemeralPrivateKey: ephemeralPrivateKeyB64,
      maxEpoch: maxEpoch,
    };
    localStorage.setItem("userKeyData", JSON.stringify(userKeyData));
    return userKeyData;
  }

  function getRedirectUri() {
    const protocol = window.location.protocol;
    const host = window.location.host;
    const customRedirectUri = protocol + "//" + host;
    console.log("customRedirectUri = " + customRedirectUri);
    return customRedirectUri;
  }

  const redirectlogin = () =>{
    
    prepareLogin().then((userKeyData) => {
      const REDIRECT_URI = "https://zklogin-dev-redirect.vercel.app/api/auth";
      const customRedirectUri = getRedirectUri();
      const params = new URLSearchParams({
        // When using the provided test client ID + redirect site, the redirect_uri needs to be provided in the state.
        state: new URLSearchParams({
          redirect_uri: customRedirectUri,
        }).toString(),
        // Test Client ID for devnet / testnet:
        client_id:
          "595966210064-3nnnqvmaelqnqsmq448kv05po362smt2.apps.googleusercontent.com",
        redirect_uri: REDIRECT_URI,
        response_type: "id_token",
        scope: "openid",
        nonce: userKeyData.nonce,
      });

      window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
    });
  }


  // --------------------------------------------------- zklogin login check ------------------------------------------------------------

  async function checkIfAddressHasBalance(address){
    console.log("Checking whether address " + address + " has balance...");
    const coins = await suiClient.getCoins({
      owner: address,
    });
    //loop over coins
    let totalBalance = 0;
    for (const coin of coins.data) {
      totalBalance += parseInt(coin.balance);
    }
    totalBalance = totalBalance / 1000000000; //Converting MIST to SUI
    setUserBalance(totalBalance);
    console.log("total balance = ", totalBalance);
    return enoughBalance(totalBalance);
  }

  function enoughBalance(userBalance) {
    return userBalance > 0.003;
  }

  //** This is just for testing purposes. DO NOT USE IN PRODUCTION */
  function getTestnetAdminSecretKey() {
    return process.env.NEXT_PUBLIC_ADMIN_SECRET_KEY;
  }

  async function giveSomeTestCoins(address) {
    console.log("Giving some test coins to address " + address);
    const adminPrivateKey = getTestnetAdminSecretKey();
    if (!adminPrivateKey) {
      createRuntimeError(
        "Admin Secret Key not found. Please set NEXT_PUBLIC_ADMIN_SECRET_KEY environment variable."
      );
      return;
    }
    let adminPrivateKeyArray = Uint8Array.from(
      Array.from(fromB64(adminPrivateKey))
    );
    // Modified getting private key method using the decodeSuiPrivateKey
    const keyPair = decodeSuiPrivateKey(adminPrivateKey);
    const adminKeypair = Ed25519Keypair.fromSecretKey(keyPair.secretKey);
    const tx = new TransactionBlock();
    const giftCoin = tx.splitCoins(tx.gas, [tx.pure(30000000)]);

    tx.transferObjects([giftCoin], tx.pure(address));

    const res = await suiClient.signAndExecuteTransactionBlock({
      transactionBlock: tx,
      signer: adminKeypair,
      requestType: "WaitForLocalExecution",
      options: {
        showEffects: true,
      },
    });
    const status = res?.effects?.status?.status;
    if (status === "success") {
      console.log("Gift Coin transfer executed! status = ", status);
      checkIfAddressHasBalance(address);
    }
    if (status == "failure") {
      console.log("Gift Coin transfer Failed. Error = " + res?.effects);
    }
  }

  async function getSalt(subject, jwtEncoded) {
    const getSaltRequest = {
        subject: subject,
        jwt: jwtEncoded
    }
    console.log("Getting salt...");
    console.log("Subject = ", subject);
    console.log("jwt = ", jwtEncoded);
    const response = await axios.post('/api/salt', getSaltRequest);
    console.log("getSalt response = ", response);
    if (response?.data.status == 200) {
        const userSalt = response.data.salt;
        console.log("Salt fetched! Salt = ", userSalt);
        return userSalt;
    } else {
        console.log("Error Getting SALT");
        return null;
    }
}

  async function loadRequiredData(encodedJwt) {
    //Decoding JWT to get useful Info
    const decodedJwt = (await jwt_decode(
      encodedJwt
    ));

  //   const getSaltRequest = {
  //     subject: subject,
  //     jwt: jwtEncoded
  // }

    setSubjectID(decodedJwt.sub);
    //Getting Salt
    const userSalt = await getSalt(decodedJwt.sub, encodedJwt);
    // const response = await axios.post("/api/salt", getSaltRequest);

    // const userSalt = response.data.salt;
    if (!userSalt) {
      createRuntimeError("Error getting userSalt");
      return;
    }

    //Generating User Address
    const address = jwtToAddress(encodedJwt, BigInt(userSalt));

    setUserAddress(address);
    setUserSalt(userSalt);
    const hasEnoughBalance = await checkIfAddressHasBalance(address);
    if (!hasEnoughBalance) {
      await giveSomeTestCoins(address);
      toast.success(
        "We' ve fetched some coins for you, so you can get started with Sui !",
        { duration: 8000 }
      );
    }

    console.log("All required data loaded. ZK Address =", address);
  }

  useLayoutEffect(() => {
    const hash = new URLSearchParams(window.location.hash.slice(1));
    const jwt_token_encoded = hash.get("id_token");

    localStorage.setItem("id_token", jwt_token_encoded);

    const userKeyData = JSON.parse(
      localStorage.getItem("userKeyData")
    );

    if (!jwt_token_encoded) {
      // createRuntimeError("Could not retrieve a valid JWT Token!");
      return;
    }

    if (!userKeyData) {
      createRuntimeError("user Data is null");
      return;
    }

    setJwtEncoded(jwt_token_encoded);

    loadRequiredData(jwt_token_encoded);
  }, []);

  return (
    <div>

<div className="flex">
{userAddress ? (
            <div className='flex gap-2'>
              {avatarUrl && <img src={avatarUrl} alt="Avatar" style={{width: 40}}/>}
              <dd className='text-sm leading-6 text-gray-700 sm:col-span-2 text-white'>
                <div>{userAddress?.slice(0, 3)}...{userAddress?.slice(-3)}</div>
                <div className="flex justify-center">
                  <button
                    type='button'
                    className='rounded-md bg-white px-2 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                    onClick={() => {
                      navigator.clipboard.writeText(userAddress);
                    }}
                  >
                    Copy
                  </button>
                </div>
              </dd>
            </div>
          ) : null}
          {userAddress ? (
            <div className=''>
              <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 text-white'>
                <div className="justify-end flex">{userBalance.toFixed(4)} SUI</div>
                <div>
                  <button
                    type='button'
                    className='rounded-md bg-white py-1 px-2 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                    disabled={!userAddress}
                    onClick={() => giveSomeTestCoins(userAddress)}
                  >
                    Get Testnet Coins
                  </button>
                </div>
              </dd>
            </div>
          ) : null}

</div>

      {userAddress ? (
          <></>
      )
    :(
      // <button onClick={()=>{setloginbox(true)}} className="px-4">Login</button>
      <button onClick={redirectlogin} className='bg-white text-gray-700 hover:text-gray-900 font-semibold py-2 px-2 border rounded-lg flex items-center'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  x='0px'
                  y='0px'
                  width='24'
                  height='24'
                  viewBox='0 0 48 48'
                >
                  <path
                    fill='#FFC107'
                    d='M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z'
                  ></path>
                  <path
                    fill='#FF3D00'
                    d='M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z'
                  ></path>
                  <path
                    fill='#4CAF50'
                    d='M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z'
                  ></path>
                  <path
                    fill='#1976D2'
                    d='M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z'
                  ></path>
                </svg>
                <span>Login with Google</span>
              </button>
    )}

{/* { loginbox && (<animated.div style={modalProps} className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-16 rounded-lg flex gap-y-6 justify-center w-[30rem] items-center flex-col text-center relative">
        <h2 className="text-2xl font-bold mb-4">Login Options</h2>

        <button onClick={redirectlogin} className='bg-white text-gray-700 hover:text-gray-900 font-semibold py-2 px-4 border rounded-lg flex items-center space-x-2'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  x='0px'
                  y='0px'
                  width='48'
                  height='48'
                  viewBox='0 0 48 48'
                >
                  <path
                    fill='#FFC107'
                    d='M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z'
                  ></path>
                  <path
                    fill='#FF3D00'
                    d='M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z'
                  ></path>
                  <path
                    fill='#4CAF50'
                    d='M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z'
                  ></path>
                  <path
                    fill='#1976D2'
                    d='M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z'
                  ></path>
                </svg>
                <span>Login with Google</span>
              </button>
      </div>
    </animated.div>)} */}
    </div>
  );
};

export default Navbar;
