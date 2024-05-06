// import type { NextApiRequest, NextApiResponse } from "next";

// import { kv } from "@vercel/kv";
// import { LoginResponse, ZKPRequest } from "../../../components/types/UsefulTypes";
// import axios from "axios";
// import jwt_decode from "jwt-decode";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   console.log("hello");

//   const body = await req.body;
//   return res.status(200).json({ salt: "1234567890123456" });

//   const zkpRequest = body;
//   if (!zkpRequest) {
//     return res.status(422).json({ message: "Wrong Body Format!" });
//   }

//   const decodedJwt: LoginResponse = jwt_decode(zkpRequest.jwt) as LoginResponse;

//   console.log(
//     "Received request to get proof for subject = ",
//     decodedJwt.sub,
//     " Force Update = ",
//     zkpRequest.forceUpdate ?? false
//   );

//   const savedProof = await kv.hget(decodedJwt?.sub, "zkp");
//   console.log("zkproof", savedProof);

//   if (savedProof && !zkpRequest.forceUpdate) {
//     console.log("ZK Proof found in database.");
//     return res.status(200).json({ zkp: savedProof });
//   } else {
//     const proverResponse = await getZKPFromProver(zkpRequest);

//     if (proverResponse?.status !== 200 || !proverResponse.data) {
//       return res.status(200).json({
//         message: proverResponse.statusText,
//       });
//     }

//     const zkpProof = proverResponse.data;
//     console.log("ZK Proof created from prover ", zkpProof);

//     //Proof is created for first time. We should store it in database before returning it.
//     storeProofInDatabase(zkpProof, decodedJwt.sub);

//     return res.status(200).json({ zkp: zkpProof });
//   }
// }

// async function getZKPFromProver(zkpPayload: any) {
//   console.log("ZK Proof not found in database. Creating proof from prover...");
//   const proverURL =
//     process.env.NEXT_PUBLIC_PROVER_API || "https://prover.mystenlabs.com/v1";
//   try {
//     const res = await axios.post(proverURL, zkpPayload);
//     return res;
//   } catch (error) {
//     console.log("Error from proveer:", error);
//   }
// }

// function storeProofInDatabase(zkpProof: string, subject: string) {
//   kv.hset(subject, { zkp: zkpProof });
//   console.log("Proof stored in database.");
// }


import { NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";
import {GetSaltRequest, GetSaltResponse} from "../../../components/types/UsefulTypes";
import {generateRandomness} from "@mysten/zklogin";



export async function POST(request: NextRequest) {

    const body = await request.json();
    try {
        let dataRequest: GetSaltRequest = body as GetSaltRequest;
        if (dataRequest && dataRequest.subject && dataRequest.jwt) {
            console.log("Received request for FETCHING Salt for subject ", dataRequest.subject);
            let response = await getExisting(dataRequest);
            if(!response?.salt) {
                console.log("Salt not found in KV store. Fetching from Mysten API. jwt = ", dataRequest.jwt, "subject = ", dataRequest.subject);
                const saltFromMysten = await getSaltFromMystenAPI(dataRequest.jwt!);

                //storing new salt in DB
                kv.hset(dataRequest.subject, {"salt" : saltFromMysten});

                //returning response
                response = {subject: dataRequest.subject, salt: saltFromMysten} ;
                console.log("response from mysten = ", response);
            }
            return NextResponse.json({status: 200, statusText: "OK", salt : response.salt});
        }
    }catch (e) {
        console.log("Wrong Request Body Format!. Inner error= ",e);
        return NextResponse.json({status:422, statusText: "Wrong Body Format!. Inner Error= "+e, data: ""});
    }
}

async function getSaltFromMystenAPI(jwtEncoded : string ){
    const url : string = process.env.NEXT_PUBLIC_SALT_API || "https://salt.api.mystenlabs.com/get_salt";
    const payload = {token: jwtEncoded};

    const response = await fetch(url!, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json",
        },
        referrerPolicy: "no-referrer",
        body: JSON.stringify(payload),
    });
   const responseJson = await response.json();
   return responseJson.salt;
}

async function getExisting(dataRequest: GetSaltRequest) : Promise<GetSaltResponse | null> {
    let salt : string | null = null;
    try {
        salt = await kv.hget(dataRequest.subject, "salt");
    }catch (error ) {
        const errorMessage = error as Error;
        if(errorMessage.message.includes("WRONGTYPE")){
            //We recently refactored KV store to use hash set instead of set.
            //This error means that the key is an old entry and not a hash set. We should delete it from KV store.
            console.log("WRONGTYPE error. Deleting key from KV store.");
            kv.del(dataRequest.subject);
            return null;
        }
    }
    return {subject: dataRequest.subject, salt: salt!};
}
