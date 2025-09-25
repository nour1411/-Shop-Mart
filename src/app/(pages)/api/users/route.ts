
// route handler , can put here methods to get data

import { NextResponse } from "next/server";


export async function GET(){

    return NextResponse.json({
message:'success'
    })
}
