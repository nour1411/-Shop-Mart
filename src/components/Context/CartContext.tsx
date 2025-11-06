"use client"
import { CartResponse } from '@/interfaces/cardInterface';
import { useSession } from 'next-auth/react';
import React, { createContext, ReactNode, useEffect, useState } from 'react'

export const CartContext =createContext<{
     isLoading:boolean,
    cartData:null|CartResponse,
    setCartData:(value:CartResponse|null)=>void,
    setIsLoading:(value:boolean)=>void,
    getCart:()=>void
}>({
    isLoading:true,
    cartData:null,
    setCartData:(value)=>{},
    setIsLoading:()=>{},
    getCart:()=>{}
});

export default function CartContextProvider({children}:{children:ReactNode}){
const [cartData, setCartData] = useState<CartResponse|null>(null);
const [isLoading, setIsLoading] = useState<boolean>(true);
 const session =  useSession();
async function getCart() {
    setIsLoading(true)
    if(session.status=='authenticated'){
        const response=await fetch(`https://shop-mart-topaz.vercel.app/api/get-cart`);
  
    const payload= await response.json();
   setCartData(payload);
    }

    setIsLoading(false)
}

useEffect(()=>{
   
    
    getCart();
},[session])

    return <CartContext.Provider value={{cartData,setCartData,isLoading,setIsLoading,getCart}}>
        {children}
    </CartContext.Provider>
}