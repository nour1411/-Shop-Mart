import { getUserToken } from '@/Utilities/getToken';
import { NextRequest, NextResponse } from "next/server";


export async function GET(req:NextRequest){
const token = await getUserToken();
   const response=await fetch(`${process.env.NEXT_API}/wishlist`,{
        method:"GET",
        headers:{
            token:token+''
        }
    });
    const payload= await response.json();

    return NextResponse.json(payload);
}