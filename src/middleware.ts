import { NextRequest, NextResponse } from "next/server";
import { getUserToken } from "./Utilities/getToken";

const protectedPages=['/cart','/profile','/wishlist'];
const authPages=['/login','/register'];

export default async function middleware(req:NextRequest) {
    

   const token = await getUserToken()

    console.log(token);
    
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
 