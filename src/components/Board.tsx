'use client';

import { useEffect, useRef, useState } from 'react';

import { gameContent } from '@/lib/GameData';
import Button from './Button';
import { IoIosEye } from 'react-icons/io';
import profile from '../../public/profile.jpg';
import Image from 'next/image';
import { Network, Alchemy } from 'alchemy-sdk';
import Cookies from "js-cookie";
import CongratulationsModal from './CongratulationsModal';
import { useRouter } from 'next/navigation';
import jwt_decode from "jwt-decode";
import {
  SerializedSignature,
  decodeSuiPrivateKey,
} from "@mysten/sui.js/cryptography";
import { Ed25519Keypair } from "@mysten/sui.js/keypairs/ed25519";
import { TransactionBlock } from "@mysten/sui.js/transactions";
import {
  genAddressSeed,
  getZkLoginSignature,
  jwtToAddress,
  getExtendedEphemeralPublicKey,
} from "@mysten/zklogin";

import { ZkLoginSignatureInputs } from "@mysten/sui.js/dist/cjs/zklogin/bcs";

import axios from "axios";
import { NetworkName, makeExplorerUrl, requestSuiFromFaucet, shortenSuiAddress } from '@polymedia/suits';
import { SuiClient, getFullnodeUrl } from '@mysten/sui.js/client';



const setupDataKey = 'zklogin-demo.setup';
const accountDataKey = 'zklogin-demo.accounts';

/* Types */

type OpenIdProvider = 'Google' | 'Twitch' | 'Facebook';

type SetupData = {
    provider: OpenIdProvider;
    maxEpoch: number;
    randomness: string;
    ephemeralPrivateKey: string;
}

type AccountData = {
    provider: OpenIdProvider;
    userAddr: string;
    zkProofs: any;
    ephemeralPrivateKey: string;
    userSalt: string;
    sub: string;
    aud: string;
    maxEpoch: number;
}
const GameBoard = ({ gameData } :any) => {
  const [isLoadingGame, setIsLoadingGame] = useState<boolean>(true);
  const [dieNumber, setDieNumber] = useState<number>(0);
  const [playerPosition, setPlayerPosition] = useState<number>(0);
  const [isMoveDisabled, setIsMoveDisable] = useState<boolean>(true);
  const [isRollDisabled, setIsRollDisable] = useState<boolean>(false);
  const [gameWon, setGameWon] = useState<boolean>(false);
  const [typePost, setTypePost] = useState('');
  const [optionClicked, setOptionClicked] = useState(null);
  //game Id
  const [gameId, setGameId] = useState<string | null>();
  const [selectedCell, setSelectedCell] = useState<{
    term: string;
    definition: string;
  } | null>(null);
  const [snakeCount, setSnakeCount] = useState<number>(0);
  const [ladderCount, setLadderCount] = useState<number>(0);

  const [dicemoving, setdicemoving] = useState<boolean>(false);

  const [ipfsGameData, setIpfsGameData] = useState(gameContent);

  // State for displaying QuestionModal
  const [questionModalVisible, setQuestionModalVisible] =
    useState<boolean>(false);
  const [questionModalContent, setQuestionModalContent] = useState<{
    question: string;
    options: string[];
    answer: string;
  } | null>(null);
  const router = useRouter();

  const address = Cookies.get("wallet");




  // setting api key for fetching
  const settings = {
    apiKey: '',
    network: Network.ETH_SEPOLIA,
  };

  console.log("address",address);
  const alchemy = new Alchemy(settings);

  const delay = (ms:any) => new Promise(resolve => setTimeout(resolve, ms));

const getRandomNumber = async (): Promise<number> => {
  setdicemoving(true);

  const randomDecimal = Math.random();
  const randomNumber = Math.floor(randomDecimal * 6) + 1;

  await delay(2000); // Delay for 2 seconds

  setdicemoving(false);

  return randomNumber;
};

  const dieNumberToSVG: Record<number, string> = {
    1: 'Dice-1.svg',
    2: 'Dice-2.svg',
    3: 'Dice-3.svg',
    4: 'Dice-4.svg',
    5: 'Dice-5.svg',
    6: 'Dice-6.svg',
  };

  const getDieSVGUrl = (number: number) => `/${dieNumberToSVG[number]}`;

  useEffect(() => {
    if (isMoveDisabled === false && isRollDisabled === true) {
      const timer = setTimeout(() => {
        handleMove();
      }, 1000); // 1000ms delay before calling handleMove

      return () => clearTimeout(timer);
    }
  }, [isMoveDisabled, isRollDisabled]);

  const handleMove = () => {
    if (!isMoveDisabled) {
      const ladderStartPoints = [3, 8, 13, 19, 33, 36, 37, 50, 54];
      const ladderEndPoints = [12, 16, 22, 30, 52, 44, 47, 69, 63];
      const snakeStartPoints = [10, 27, 24, 31, 43, 40, 58, 70, 65];
      const snakeEndPoints =    [1, 9, 15, 23, 26, 30, 39, 51, 55];

      const ladderpoints =  [3, 12, 8, 16,  13, 22,  19, 30, 33, 52, 36, 44, 37, 47, 50,69, 54, 63];

      const snakepoints = [10,1, 27,9, 24, 15,31,23, 43, 26, 40, 30, 58, 39, 70, 51, 65, 55];

      // const ladderStartPoints = [7, 10, 30, 31, 36, 47, 54 ];
      // const ladderEndPoints =   [14, 19, 50, 51, 42, 67, 62];
      // const snakeStartPoints =  [21, 26, 28, 37, 41, 55, 68];
      // const snakeEndPoints =    [13, 9,  20, 28, 25, 46, 48];

      const nextPosition = dieNumber + playerPosition;
      let eventEncountered = '';

      // Check if the player is at the starting point of a ladder or a snake
      const isLadderStart = ladderStartPoints.includes(nextPosition);
      const isSnakeStart = snakeStartPoints.includes(nextPosition);

      if (isLadderStart) {
        setTypePost('ladder');
        setLadderCount((prevCount) => prevCount + 1);
      } else if (isSnakeStart) {
        setTypePost('snake');
        setSnakeCount((prevCount) => prevCount + 1);
      }

      // Get questionModalContent from GameData
      const eventIndex = isLadderStart
        ? ladderStartPoints.indexOf(nextPosition)
        : isSnakeStart
        ? snakeStartPoints.indexOf(nextPosition)
        : -1;

      if (eventIndex !== -1) {
        const eventContent = ipfsGameData.find(
          (cell) =>
            cell.id ===
            (isLadderStart
              ? ladderStartPoints[eventIndex]
              : snakeStartPoints[eventIndex])
        );

        if (eventContent) {
          setQuestionModalContent({
            question: eventContent.question || '',
            options: eventContent.options || [],
            answer: eventContent.answer || '',
          });
        }

        // Cap playerPosition at 72
        const newPosition = Math.min(
          isLadderStart
            ? ladderEndPoints[eventIndex]
            : snakeEndPoints[eventIndex],
          72
        );
        setPlayerPosition(newPosition);

        // Enable rolling dice after encountering a ladder or snake
        setIsMoveDisable(true);
        setIsRollDisable(false);

        // Show QuestionModal for ladder or snake
        setQuestionModalVisible(true);
      } else {
        // Check if the player landed on a cell with quiz information
        const currentCell = ipfsGameData.find(
          (cell) => cell.id === nextPosition
        );
        if (
          currentCell &&
          currentCell.question &&
          currentCell.options &&
          currentCell.answer
        ) {
          eventEncountered = 'quiz';

          // Display the question modal
          setQuestionModalContent({
            question: currentCell.question,
            options: currentCell.options,
            answer: currentCell.answer,
          });
          setQuestionModalVisible(true);

          // Disable move and roll dice after encountering a quiz
          setIsMoveDisable(true);
          setIsRollDisable(true);
        } else {
          // Cap playerPosition at 72
          const newPosition = Math.min(nextPosition, 72);
          // Move the player to the next position
          setPlayerPosition(newPosition);

          // Enable rolling dice after a move
          setIsMoveDisable(true);
          setIsRollDisable(false);

          // Check for winning condition
          if (newPosition >= 72) {
            setGameWon(true);
          }
        }
      }
    } else {
      // Disable the move and enable rolling dice
      setIsMoveDisable(true);
      setIsRollDisable(false);
    }
  };

  const handleOptionClick = (selectedOption: any) => {
    if (selectedOption === questionModalContent?.answer) {
      // Handle correct answer, change button color, and set timeout
      setOptionClicked(selectedOption);
      setTimeout(() => {
        setQuestionModalVisible(false);
      }, 1000);
    } else {
      // Handle incorrect answer if needed
      // You can add some visual feedback or other actions
      setOptionClicked(selectedOption);
    }
  };

  const blurbackground = {
    backgroundImage: 'linear-gradient(to bottom, #7AB2B2, #4D869C)',
  }
// -------------------------------------------------------------------------------------------------------------------------------------
  const NETWORK: NetworkName = 'devnet';
const MAX_EPOCH = 2; // keep ephemeral keys active for this many Sui epochs from now (1 epoch ~= 24h)
const accounts = useRef<AccountData[]>(loadAccounts()); // useRef() instead of useState() because of setInterval()
const [balances, setBalances] = useState<Map<string, number>>(new Map()); // Map<Sui address, SUI balance>
const [modalContent, setModalContent] = useState<string>('');
const suiClient = new SuiClient({
    url: getFullnodeUrl(NETWORK),
});

// console.log(accounts)
async function sendTransaction(account: AccountData) {
  try {
    setModalContent('🚀 Sending transaction...');
    console.log('[sendTransaction] Starting transaction');

    // Sign the transaction bytes with the ephemeral private key
    const txb = new TransactionBlock();
    const packageObjectId = "0x33980102d580d62a573785865c7ac6dd36dbcb35faae0771b5b5ef1949b9838f";
    txb.moveCall({
      target: `${packageObjectId}::snl::initialize_game`,
      arguments: [
        txb.pure("mygame"),        // Name argument
        txb.pure("bvklb odjfoiv askhjvlk"), // Description argument
      ],
    });

    txb.setSender(accounts.current[0].userAddr);
    console.log('[sendTransaction] Account address:', accounts.current[0].userAddr);

    const ephemeralKeyPair = keypairFromSecretKey(account.ephemeralPrivateKey);
    const { bytes, signature: userSignature } = await txb.sign({
      client: suiClient,
      signer: ephemeralKeyPair,
    });

    console.log('[sendTransaction] Transaction signed:', { bytes, userSignature });

    // Generate an address seed by combining userSalt, sub (subject ID), and aud (audience)
    const addressSeed = genAddressSeed(
      window.BigInt(account.userSalt),
      'sub',
      account.sub,
      account.aud,
    ).toString();

    console.log('[sendTransaction] Address seed generated:', addressSeed);

    // Serialize the zkLogin signature by combining the ZK proof (inputs), the maxEpoch,
    // and the ephemeral signature (userSignature)
    const zkLoginSignature: SerializedSignature = getZkLoginSignature({
      inputs: {
        ...account.zkProofs,
        addressSeed,
      },
      maxEpoch: account.maxEpoch,
      userSignature,
    });

    console.log('[sendTransaction] ZK Login signature created:', zkLoginSignature);

    // Execute the transaction
    const result = await suiClient.executeTransactionBlock({
      transactionBlock: bytes,
      signature: zkLoginSignature,
      options: {
        showEffects: true,
      },
    });

    console.debug('[sendTransaction] executeTransactionBlock response:', result);

    await fetchBalances([account]);
  } catch (error) {
    console.warn('[sendTransaction] executeTransactionBlock failed:', error);
  } finally {
    setModalContent('');
  }
}

function keypairFromSecretKey(privateKeyBase64: string): Ed25519Keypair {
  const keyPair = decodeSuiPrivateKey(privateKeyBase64);
  return Ed25519Keypair.fromSecretKey(keyPair.secretKey);
}
function loadAccounts(): AccountData[] {
  const dataRaw = sessionStorage.getItem(accountDataKey);
  if (!dataRaw) {
      return [];
  }
  const data: AccountData[] = JSON.parse(dataRaw);
  return data;
}
async function fetchBalances(accounts: AccountData[]) {
  if (accounts.length == 0) {
      return;
  }
  const newBalances = new Map<string, number>();
  for (const account of accounts) {
      const suiBalance = await suiClient.getBalance({
          owner: account.userAddr,
          coinType: '0x2::sui::SUI',
      });
      newBalances.set(
          account.userAddr,
          +suiBalance.totalBalance/1_000_000_000
      );
  }
  setBalances(prevBalances =>
      new Map([...prevBalances, ...newBalances])
  );
}
// ---------------------------------------------------------------------------------------------------------------------------------
  const queryevents = async() => {
    let cursor = null;
    let hasNextPage = false;
    let allParsedJsonData: any[] = [];

    do {
      const res:any = await suiClient.queryEvents({
                query: {
                    MoveModule: {
                        module: `snl`,
                        package: '0x33980102d580d62a573785865c7ac6dd36dbcb35faae0771b5b5ef1949b9838f',
                    },
                },
                limit: 50,
                order: "ascending",
                cursor,
            });

            cursor = res.nextCursor;
    hasNextPage = res.hasNextPage;

    console.log(
      res.data.length,
      res.data.map((d:any) => d.parsedJson),
      res.nextCursor,
      res.hasNextPage,
    );
    
    allParsedJsonData = allParsedJsonData.concat(res.data.map((d:any) => d.parsedJson));

  } while (hasNextPage);

   // Log the absolute last parsedJson data entry
   const lastParsedJson = allParsedJsonData.length > 0 ? allParsedJsonData[allParsedJsonData.length - 1] : null;
   console.log(lastParsedJson);

  }


  // --------------------------------------------------------- get dynamic board data ----------------------------------------

  useEffect(() => {
    const fetchData = async () => {
      try {
        const urlhash = gameData;
        console.log("urlhash", urlhash);
        const data = await fetch(`https://nftstorage.link/ipfs/${urlhash}`); // Replace with your IPFS hash
        const ipfsdata = await data.json();
        setIpfsGameData(ipfsdata);
        console.log("ipfs data", ipfsdata)
      } catch (err) {
        console.log('Failed to fetch data from IPFS');
      }
    };

    fetchData();
  }, []);


  return (
    <>
    <div className="flex gap-4">
      <div className="flex justify-center items-stretch gap-4 backdrop-blur-2xl rounded-3xl py-10 pl-10">
        <div className="bg-cover overflow-hidden" style={{backgroundImage:`url("/board_game.png")`}}>
          <div className="grid grid-cols-9 grid-rows-8">
            {ipfsGameData
              .slice()
              .reverse()
              .map(({ id, term, definition }) => (
                <div
                  key={id}
                  className="h-[5rem] w-[7.5rem] lg:w-[6rem] p-[4px] lg:p-[3px] flex justify-between flex-col text-sm"
                  style={id === playerPosition ? { backgroundColor: '#FFE6E6' } : {}}
                >
                  <div className="text-xs whitespace-nowrap overflow-ellipsis overflow-hidden">
                    {term}
                  </div>
                  <div className="rounded-lg text-2xl mx-auto shadow-2xl">
                    {id === playerPosition ? (
                      <Image
                        src={profile.src}
                        alt="profile"
                        width={48}
                        height={48}
                        className=" rounded-[3rem] lg:h-[2rem] lg:w-[2rem] lg:rounded-[2rem] justify-end items-end border"
                      />
                    ) : (
                      ''
                    )}
                  </div>
                  <div className="text-[15px] p-0 m-0 font-medium flex items-center justify-between text-black">
                    {id}
                    <IoIosEye
                      className="hover:text-primary active:text-primary cursor-pointer" style={{color:'#7469B6'}}
                      onClick={() => {
                        setSelectedCell(
                          selectedCell === null || selectedCell.term !== term
                            ? { term, definition }
                            : null
                        );
                      }}
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="flex justify-end flex-col text-3xl">
          {playerPosition === 0 ? (
            <Image
              src={profile.src}
              width={24}
              height={24}
              alt="profile"
              className="rounded-[3rem] lg:h-[2rem] lg:w-[2rem] lg:rounded-[2rem] justify-end items-end border"
            />
          ) : (
            ''
          )}
        </div>
      </div>


      <div className="flex justify-center rounded-3xl p-4" style={{backgroundImage:`url("/light_bg_game.png")`}}>
        <div className="flex px-4 h-[3.5rem] w-[22rem] justify-center mt-10 gap-6 rounded-full mx-8" style={{backgroundColor:'#FFFFFFB2'}}>
          <div className="flex w-full items-center justify-between">
            <div>
              <Button
                variant={isRollDisabled || gameWon ? 'inactive' : 'primary'}
                onClick={async () => {
                  const rollResult = await getRandomNumber();
                  setDieNumber(rollResult);
                  setIsMoveDisable(false);
                  setIsRollDisable(true);
                }}
                disabled={isRollDisabled || gameWon}
                style={{backgroundColor:'#04AE91'}}
              >
                {isRollDisabled ? (
                  <Image
                    src={getDieSVGUrl(dieNumber)}
                    width={24}
                    height={24}
                    // className="w-[64px] h-[64px]"
                    alt="die-icon"
                  />
                ) : (
                  // <img src="/dice-roll-dice.gif" className="w-8"/>
                  <>
                  { dicemoving ? (
                    <img src="/dice-roll-dice.gif" className="w-8"/>
                  ): (
                    <img src="/static_dice.png" className="w-8"/>
                  )}
                  </>
                )}
              </Button>
            </div>
            <div className="font-bold text-lg">Position</div>

            <div className="flex flex-col justify-center relative font-medium gap-y-1 items-center">
              <div className="text-white flex items-center justify-center rounded-full bg-[#04AE91] px-10 py-1.5">
                {playerPosition}
              </div>
            </div>
            {/* <div>
              <Button
                variant={isMoveDisabled ? 'inactive' : 'primary'}
                onClick={handleMove}
                disabled={isMoveDisabled || gameWon}
              >
                Move
              </Button>
            </div> */}
          </div>
        </div>
       
        {accounts.current.map((acct) => (
    <button key={acct.userAddr} onClick={() => sendTransaction(acct)}>Initialize Game</button>
))}


        <button onClick={queryevents}>Query</button>
      </div>
      </div>

      {selectedCell && (
        <div className="fixed top-0 left-0 z-50 bg-cover right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-75">
          <div className="p-4 bg-white bg-gradient bg-cover min-h-[20rem] gap-y-4 lg:gap-y-3 flex flex-col justify-between w-[54rem] px-8 rounded-lg">
            <h1 className="font-bold text-[32px]">{selectedCell.term}</h1>
            <p className="text-[#4e4e4e] font-medium">
              {selectedCell.definition}
            </p>
            <div className="w-full flex justify-end">
              <button
                className="flex justify-center items-center py-2 bg-[#46cc46] w-[5rem] rounded-full"
                onClick={() => setSelectedCell(null)}
              >
                Got it!
              </button>
            </div>
          </div>
        </div>
      )}

      {questionModalVisible && (
        <div className="fixed top-0 inset-0 h-full left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-75 z-[999999]">
          <div className="p-4 bg-white bg-gradient bg-cover min-h-[20rem] gap-y-4 lg:gap-y-3 flex flex-col justify-between w-[54rem] px-8 rounded-lg">
            {typePost === 'snake' ? (
              <div className="w-full flex">
                <div className="p-2 px-3 bg-[#ce42428e] rounded-full">
                  Opps! You hit a snake.
                </div>
              </div>
            ) : (
              <div className="w-full flex">
                <div className="py-2 px-3 bg-[#72e23e8e] rounded-full">
                  Yeah! Get ready to climb up a ladder.
                </div>
              </div>
            )}
            <h1 className="font-semibold text-[20px]">
              {questionModalContent?.question}
            </h1>
            {questionModalContent?.options.map((option, index) => (
              <div className="w-full flex flex-start" key={index}>
                <button
                  onClick={() => handleOptionClick(option)}
                  className={`cursor-pointer text-left py-2 px-4 border rounded-full mb-2 ${
                    optionClicked === option
                      ? option === questionModalContent?.answer
                        ? 'bg-[#72e23e8e]'
                        : 'bg-[#ce42428e]'
                      : ''
                  }`}
                >
                  {option}
                </button>
              </div>
            ))}
            <div className="w-full flex justify-end">
              <button
                className="flex justify-center items-center py-2 px-4 bg-grad rounded-full"
                onClick={() => setQuestionModalVisible(false)}
              >
                Skip
              </button>
            </div>
          </div>
        </div>
      )}

      {gameWon && <CongratulationsModal onClose={() => {router.push('/mint')}} snakesNumber={snakeCount} laddersNumber={ladderCount} />}
    </>
  );
};

export default GameBoard;
