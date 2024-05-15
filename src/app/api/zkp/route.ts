import type { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";
import { LoginResponse, ZKPRequest } from "../../../components/types/UsefulTypes";
import axios from "axios";
import jwt_decode from "jwt-decode";

export async function POST(
  req: NextRequest,
  res: NextResponse
) {
  const body = await req.json();
  const zkpRequest = body as ZKPRequest;
  if (!zkpRequest)
    return NextResponse.json({status: 422, statusText: "Wrong Body Format!"});
    // return res.status(422).json({ message: "Wrong Body Format!" });

  const decodedJwt: LoginResponse = jwt_decode(
    zkpRequest.zkpPayload?.jwt!
  ) as LoginResponse;

  console.log(
    "Received request to get proof for subject = ",
    decodedJwt.sub,
    " Force Update = ",
    zkpRequest.forceUpdate
  );

  const savedProof = await kv.hget(decodedJwt?.sub, "zkp");

  if (savedProof && !zkpRequest.forceUpdate) {
    console.log("ZK Proof found in database.");
    return NextResponse.json({status: 200, zkp: savedProof });
    // return res.status(200).json({ zkp: savedProof });
  } else {
    const proverResponse = await getZKPFromProver(zkpRequest.zkpPayload);
    console.log("Prover Res", proverResponse);

    if (proverResponse?.status !== 200 || !proverResponse.data) {
      return NextResponse.json({status: 500, statusText: proverResponse?.statusText ?? "no prover response"});
      // return res
      //   .status(500)
      //   .json({ message: proverResponse?.statusText ?? "no prover response" });
    }

    const zkpProof = proverResponse?.data;
    console.log("ZK Proof created from prover ", zkpProof);

    //Proof is created for first time. We should store it in database before returning it.
    storeProofInDatabase(zkpProof, decodedJwt.sub);

    return NextResponse.json({status: 200, zkp: savedProof });
    // return res.status(200).json({ zkp: zkpProof });
  }
}

async function getZKPFromProver(zkpPayload: any) {
  console.log("ZK Proof not found in database. Creating proof from prover...");
  const proverURL =
    process.env.NEXT_PUBLIC_PROVER_API || "https://prover.mystenlabs.com/v1";
  try {
    const res = await axios.post(proverURL, zkpPayload);
    return res;
  } catch (error: any) {
    console.log("Error:", error.response.data);
  }
}

function storeProofInDatabase(zkpProof: string, subject: string) {
  kv.hset(subject, { zkp: zkpProof });
  console.log("Proof stored in database.");
}
