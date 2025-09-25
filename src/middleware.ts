import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const protectedPages=['/cart','/profile','/wishlist'];
const authPages=['/login','/register'];

export default async function middleware(req:NextRequest) {
    

    let token = await getToken({req});


    if (protectedPages.includes(req.nextUrl.pathname)) {
        if (token) {
               return NextResponse.next()
        }else{
            const redirectUrl = new URL('/login',process.env.NEXT_URL)
                return NextResponse.redirect(redirectUrl)
        }
    }

    if (authPages.includes(req.nextUrl.pathname)) {
        if (token) {
               const redirectUrl = new URL('/',process.env.NEXT_URL)
                return NextResponse.redirect(redirectUrl)
        }else{
          
    return NextResponse.next()
        }
    }

    return NextResponse.next()
}
export const config={
matcher:['/login','/register','/cart','/profile','/wishlist']
}
 