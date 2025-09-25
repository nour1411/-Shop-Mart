"use client"

import { CartContext } from '@/components/Context/CartContext'
import { WishlistContext } from '@/components/Context/WishlistContext'
import { Button } from '@/components/ui/button'
import { CardFooter } from '@/components/ui/card'
import { HeartIcon, Loader2, ShoppingCartIcon } from 'lucide-react'
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { addToCartAction } from './actions/addToCart.action'
import { addToWishlistAction } from './actions/addToWishlist.action'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { removeFromWishlistAction } from './actions/removeFromWishList'


export default function AddToCart({productId}:{productId:string}) {
  const [isLoading,setIsLoading]=useState<boolean>(false)
  const {setCartData,getCart}=useContext(CartContext);
  const {wishlistData,setWishlistData,getWishlist}=useContext(WishlistContext);

  const isInWishlist = wishlistData?.data?.some((item)=> item._id === productId)

  const session=useSession();
 const router =useRouter();

  async function addToCart() {
    if (session.status=='authenticated') {
      setIsLoading(true);
    const payload= await addToCartAction(productId);
    toast.success(payload.message)
    setCartData(payload);
    getCart();
    setIsLoading(false);
    }else{
      router.push('/login')
    }
  }

  async function addToWishlist() {
    if (session.status=='authenticated') {
      const payload=await addToWishlistAction(productId);
    toast.success(payload.message)
    setWishlistData(payload);
    getWishlist();
    }else{
      router.push('/login')
    }
  }

  async function removeFromWishlist() {
    if (session.status=='authenticated') {
     const payload=await removeFromWishlistAction(productId);
    toast.success(payload.message)
    setWishlistData(payload);
    getWishlist();
    }else{
      router.push('/login')
    }
    }
  

  const toggleWishlist = () => {
    if (isInWishlist) {
     removeFromWishlist()
    } else {
      addToWishlist()
    }
  }

  return (
    <CardFooter className='gap-1'>
      <Button disabled={isLoading} onClick={addToCart} className='grow cursor-pointer'>
        {isLoading ? <Loader2 className='animate-spin'/> : <ShoppingCartIcon/>} Add To Cart
      </Button>

      <HeartIcon
        onClick={toggleWishlist}
        className='cursor-pointer'
        color={isInWishlist ? "red" : "black"}  
        fill={isInWishlist ? "red" : "white"}  
      />
    </CardFooter>
  )
}
