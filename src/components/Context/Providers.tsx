"use client"
import { SessionProvider } from 'next-auth/react'
import React, { ReactNode } from 'react'
import WishlistContextProvider from './WishlistContext'

import Navbar from '../Navbar/Navbar'
import { Toaster } from 'react-hot-toast'
import Footer from '../Footer/Footer'
import CartContextProvider from './CartContext'


export default function Providers( {children}: {children:ReactNode}) {
  return <>
    <SessionProvider>

          <WishlistContextProvider>
 <CartContextProvider>
        <Navbar/>
       <main className="container mx-auto py-5">
        <div><Toaster/></div>
         {children}
         
       </main>
       <Footer/>
    </CartContextProvider>
        </WishlistContextProvider>
        </SessionProvider>
  
  
  </>
}
