import { getUserToken } from "@/Utilities/getToken";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";


export async function GET(){

 const token = await getUserToken();

   const response=await fetch(`${process.env.NEXT_API}/cart`,{
        method:"GET",
        headers:{
            token: token+''
        }
    });
    const payload= await response.json();
  
    return NextResponse.json(payload);
}