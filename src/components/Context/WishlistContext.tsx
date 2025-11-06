"use client"

import { WishlistResponse } from '@/interfaces/wishlist';
import { getUserToken } from '@/Utilities/getToken';
import React, { createContext, ReactNode, useEffect, useState } from 'react'

export const WishlistContext =createContext<{
    isLoading:boolean,
    wishlistData:null|WishlistResponse,
    setWishlistData:(value:null|WishlistResponse)=>void,
     setIsLoading:(value:boolean)=>void,
    getWishlist:()=>void
}>({
    isLoading:true,
    wishlistData:null,
    setWishlistData:(value)=>{},
     setIsLoading:()=>{},
   getWishlist:()=>{}

});

export default function WishlistContextProvider({children}:{children:ReactNode}){
const [wishlistData, setWishlistData] = useState<WishlistResponse|null>(null);
const [isLoading, setIsLoading] = useState<boolean>(true);


async function getWishlist() {
    const token = await getUserToken();
         setIsLoading(true)
    const response=await fetch(`https://shop-mart-topaz.vercel.app/api/get-wishlist`,{
        method:"GET",
        headers:{
            token:token+''
        }
    });
    const payload= await response.json();
   setWishlistData(payload);

  setIsLoading(false)
}

useEffect(()=>{
    getWishlist();
},[])

    return <WishlistContext.Provider value={{wishlistData,isLoading,setWishlistData,getWishlist,setIsLoading}}>
        {children}
    </WishlistContext.Provider>
}