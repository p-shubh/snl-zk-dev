'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { SuiClient, getFullnodeUrl } from '@mysten/sui.js/client';
import { decodeSuiPrivateKey } from '@mysten/sui.js/cryptography';
import { Ed25519Keypair } from '@mysten/sui.js/keypairs/ed25519';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import {
  genAddressSeed,
  generateNonce,
  generateRandomness,
  getExtendedEphemeralPublicKey,
  getZkLoginSignature,
  jwtToAddress,
} from '@mysten/zklogin';
import {
  NetworkName,
  makeExplorerUrl,
  requestSuiFromFaucet,
  shortenSuiAddress,
} from '@polymedia/suits';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const NETWORK = 'devnet';
const MAX_EPOCH = 2; // keep ephemeral keys active for this many Sui epochs from now (1 epoch ~= 24h)

const suiClient = new SuiClient({
  url: getFullnodeUrl(NETWORK),
});

/* Session storage keys */

const setupDataKey = 'zklogin-demo.setup';
const accountDataKey = 'zklogin-demo.accounts';

const Profile = () => {
  const [avatarUrl, setAvatarUrl] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getRandomNumber = () => Math.floor(Math.random() * 1000);
        const apiUrl = `https://api.multiavatar.com/${getRandomNumber()}`;

        const response = await axios.get(apiUrl);
        const svgDataUri = `data:image/svg+xml,${encodeURIComponent(
          response.data
        )}`;
        setAvatarUrl(svgDataUri);
      } catch (error) {
        console.error('Error fetching avatar:', error.message);
      }
    };

    fetchData();
  }, []);

  // --------------------------------------------------- zklogin login button -----------------------------------------------------------------

  const accounts = useRef(loadAccounts()); // useRef() instead of useState() because of setInterval()
  const [balances, setBalances] = useState(new Map()); // Map<Sui address, SUI balance>
  const [modalContent, setModalContent] = useState('');

  useEffect(() => {
    completeZkLogin();
    fetchBalances(accounts.current);
    const interval = setInterval(() => fetchBalances(accounts.current), 5_000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  async function beginZkLogin(provider) {
    setModalContent(`🔑 Logging in with ${provider}...`);

    // Create a nonce
    const { epoch } = await suiClient.getLatestSuiSystemState();
    const maxEpoch = Number(epoch) + MAX_EPOCH; // the ephemeral key will be valid for MAX_EPOCH from now
    const ephemeralKeyPair = new Ed25519Keypair();
    const randomness = generateRandomness();
    const nonce = generateNonce(
      ephemeralKeyPair.getPublicKey(),
      maxEpoch,
      randomness
    );

    // Save data to session storage so completeZkLogin() can use it after the redirect
    saveSetupData({
      provider,
      maxEpoch,
      randomness: randomness.toString(),
      ephemeralPrivateKey: ephemeralKeyPair.getSecretKey(),
    });

    // Start the OAuth flow with the OpenID provider
    const urlParamsBase = {
      nonce: nonce,
      redirect_uri: window.location.origin,
      response_type: 'id_token',
      scope: 'openid',
    };
    let loginUrl;
    switch (provider) {
      case 'Google': {
        const urlParams = new URLSearchParams({
          ...urlParamsBase,
          client_id: process.env.NEXT_PUBLIC_CLIENT_ID_GOOGLE,
        });
        loginUrl = `https://accounts.google.com/o/oauth2/v2/auth?${urlParams.toString()}`;
        break;
      }
    }
    window.location.replace(loginUrl);
  }

  async function completeZkLogin() {
    const urlFragment = window.location.hash.substring(1);
    const urlParams = new URLSearchParams(urlFragment);
    const jwt = urlParams.get('id_token');
    if (!jwt) {
      return;
    }

    // remove the URL fragment
    window.history.replaceState(null, '', window.location.pathname);

    // decode the JWT
    const jwtPayload = jwtDecode(jwt);
    if (!jwtPayload.sub || !jwtPayload.aud) {
      console.warn('[completeZkLogin] missing jwt.sub or jwt.aud');
      return;
    }

    const userSalt = '1234567899867';

    const userAddr = jwtToAddress(jwt, userSalt);

    // === Load and clear the data which beginZkLogin() created before the redirect ===
    const setupData = loadSetupData();
    if (!setupData) {
      console.warn('[completeZkLogin] missing session storage data');
      return;
    }
    clearSetupData();
    for (const account of accounts.current) {
      if (userAddr === account.userAddr) {
        console.warn(
          `[completeZkLogin] already logged in with this ${setupData.provider} account`
        );
        return;
      }
    }

    const ephemeralKeyPair = keypairFromSecretKey(
      setupData.ephemeralPrivateKey
    );
    const ephemeralPublicKey = ephemeralKeyPair.getPublicKey();
    const payload = JSON.stringify(
      {
        maxEpoch: setupData.maxEpoch,
        jwtRandomness: setupData.randomness,
        extendedEphemeralPublicKey:
          getExtendedEphemeralPublicKey(ephemeralPublicKey),
        jwt,
        salt: userSalt.toString(),
        keyClaimName: 'sub',
      },
      null,
      2
    );

    console.debug('[completeZkLogin] Requesting ZK proof with:', payload);
    setModalContent('⏳ Requesting ZK proof. This can take a few seconds...');

    const zkProofs = await fetch(process.env.NEXT_PUBLIC_URL_ZK_PROVER, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payload,
    })
      .then((res) => {
        console.debug('[completeZkLogin] ZK proving service success');
        return res.json();
      })
      .catch((error) => {
        console.warn('[completeZkLogin] ZK proving service error:', error);
        return null;
      })
      .finally(() => {
        setModalContent('');
      });

    if (!zkProofs) {
      return;
    }

    // === Save data to session storage so sendTransaction() can use it ===
    saveAccount({
      provider: setupData.provider,
      userAddr,
      zkProofs,
      ephemeralPrivateKey: setupData.ephemeralPrivateKey,
      userSalt: userSalt.toString(),
      sub: jwtPayload.sub,
      aud:
        typeof jwtPayload.aud === 'string' ? jwtPayload.aud : jwtPayload.aud[0],
      maxEpoch: setupData.maxEpoch,
    });
    window.location.reload();
  }

  function keypairFromSecretKey(privateKeyBase64) {
    const keyPair = decodeSuiPrivateKey(privateKeyBase64);
    return Ed25519Keypair.fromSecretKey(keyPair.secretKey);
  }

  /**
   * Get the SUI balance for each account
   */
  async function fetchBalances(accounts) {
    if (accounts.length == 0) {
      return;
    }
    const newBalances = new Map();
    for (const account of accounts) {
      const suiBalance = await suiClient.getBalance({
        owner: account.userAddr,
        coinType: '0x2::sui::SUI',
      });
      newBalances.set(
        account.userAddr,
        +suiBalance.totalBalance / 1_000_000_000
      );
    }
    setBalances((prevBalances) => new Map([...prevBalances, ...newBalances]));
  }

  /* Session storage */

  function saveSetupData(data) {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(setupDataKey, JSON.stringify(data));
    }
  }

  function loadSetupData() {
    if (typeof window !== 'undefined') {
      const dataRaw = sessionStorage.getItem(setupDataKey);
      console.log('dataraw', dataRaw);
      if (!dataRaw) {
        return null;
      }
      const data = JSON.parse(dataRaw);
      return data;
    }
    // Add a return statement here to cover the case when typeof window is undefined
    return null;
  }

  function clearSetupData() {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(setupDataKey);
    }
  }

  function saveAccount(account) {
    const newAccounts = [account, ...accounts.current];
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(accountDataKey, JSON.stringify(newAccounts));
      accounts.current = newAccounts;
      fetchBalances([account]);
    }
  }

  function loadAccounts() {
    if (typeof window !== 'undefined') {
      const dataRaw = sessionStorage.getItem(accountDataKey);
      if (!dataRaw) {
        return [];
      }
      try {
        const data = JSON.parse(dataRaw);
        return data;
      } catch (error) {
        console.error('Error parsing account data:', error);
        return [];
      }
    }
    return [];
  }

  function clearState() {
    sessionStorage.clear();
    accounts.current = [];
    setBalances(new Map());
    window.location.reload();
  }

  const openIdProviders = ['Google'];

  return (
    <>
      <div className="z-10 w-full flex">
        <div className="z-10 w-full" style={{ backgroundColor: '#C5FFF8' }}>
          <header>
            <nav class="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
              <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                <Link href="/" class="flex items-center">
                  <img
                    src="/bingo_lion2.png"
                    class="mr-3 h-6 sm:h-9"
                    alt="Flowbite Logo"
                  />
                  <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                    SNL
                  </span>
                </Link>
                <div class="flex items-center lg:order-2">
                  <Navbar />
                  <button
                    data-collapse-toggle="mobile-menu-2"
                    type="button"
                    class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    aria-controls="mobile-menu-2"
                    aria-expanded="false"
                  >
                    <span class="sr-only">Open main menu</span>
                    <svg
                      class="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <svg
                      class="hidden w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </div>
                <div
                  class="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1 z-10"
                  id="mobile-menu-2"
                >
                  <ul class="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                    <li>
                      <Link
                        href="/explore"
                        class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                      >
                        Explore
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/launch"
                        class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                      >
                        Launch
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </header>
        </div>
      </div>

      <main
        className="flex flex-col items-center justify-between py-14 h-screen"
        style={{ backgroundImage: `url("/launchbg.png")` }}
      >
        <div
          style={{
            // filter: 'blur(8px)',
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundSize: 'cover',
            top: 0,
            left: 0,
            zIndex: 0, // Ensure the blur layer is below the content
          }}
        />

        <div>
            <div className="flex gap-2">
              <div className="text-xs leading-6 text-gray-700 sm:col-span-2 text-black">
                <div>
                  {accounts.current.length > 0 && (
                    <div
                      className="flex border border-gray-300 px-1 py-1 rounded-3xl"
                      style={{ backgroundColor: '#D1D8C5' }}
                    >
                      <div id="accounts" className="section p-20">
                        {accounts.current.map((acct) => {
                          const balance = balances.get(acct.userAddr);
                          const explorerLink = makeExplorerUrl(
                            NETWORK,
                            'address',
                            acct.userAddr
                          );

                          return (
                            <div
                              className="account flex gap-10 text-lg"
                              key={acct.userAddr}
                            >
                              {avatarUrl && (
                                <Link href="/profile">
                                  <img
                                    src={avatarUrl}
                                    alt="Avatar"
                                    style={{ width: 80 }}
                                  />
                                </Link>
                              )}

                              <div>
                            <div className='flex justify-between'>
                              <div className='font-bold'>
                                  <span className="text-sm" style={{color:'#615EFC'}}>NETWORK</span><br/>
                                  <div>Devnet</div>
                                </div>

                                <div className='font-bold'>
                                  <a target="_blank"
                                    rel="noopener noreferrer"
                                    href={explorerLink}
                                     className="text-sm p-2 rounded-lg" style={{color:'#615EFC', border:'1px solid #615EFC'}}>
                                        EXPLORER
                                </a>
                                </div>

                                </div>

                                <div className='font-bold mt-4'>
                                  <span className="text-sm" style={{color:'#615EFC'}}>ADDRESS</span><br/>
                                  <Link
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={explorerLink}
                                  >
                                    {
                                      acct.userAddr
                                    }
                                  </Link>
                                </div>

                                <div className='font-bold mt-4'>
                                <span className="text-sm" style={{color:'#615EFC'}}>BALANCE</span><br/>
                                  {typeof balance === 'undefined'
                                    ? '(loading)'
                                    : `${balance} SUI`}
                                </div>

                                <div className="flex justify-between mt-10">
                                  <button
                                    className="btn-faucet text-green-600 font-bold p-2 rounded-lg"
                                    styl={{border:'1px solid green'}}
                                    onClick={() => {
                                      requestSuiFromFaucet(
                                        NETWORK,
                                        acct.userAddr
                                      );
                                      setModalContent(
                                        '💰 Requesting SUI from faucet. This will take a few seconds...'
                                      );
                                      setTimeout(() => {
                                        setModalContent('');
                                      }, 3000);
                                    }}
                                  >
                                    Faucet SUI
                                  </button>

                                  <button
                                    className="text-red-500 font-bold p-2 rounded-lg"
                                    styl={{border:'1px solid red'}}
                                    onClick={() => {
                                      clearState();
                                    }}
                                  >
                                    Log Out
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

          {accounts.current.length <= 0 && (
            <div>
              {openIdProviders.map((provider) => (
                <button
                  className={`btn-login ${provider} flex gap-2 border border-white p-2 rounded-lg`}
                  onClick={() => {
                    beginZkLogin(provider);
                  }}
                  key={provider}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="24"
                    height="24"
                    viewBox="0 0 48 48"
                  >
                    <path
                      fill="#FFC107"
                      d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                    ></path>
                    <path
                      fill="#FF3D00"
                      d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                    ></path>
                    <path
                      fill="#4CAF50"
                      d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                    ></path>
                    <path
                      fill="#1976D2"
                      d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                    ></path>
                  </svg>
                  <span className="text-white text-sm mt-0.5">
                    Login with Google
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Profile;
