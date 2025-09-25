"use client"
import Loading from '@/app/loading';
import { WishlistContext } from '@/components/Context/WishlistContext'
import React, { useContext } from 'react'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from 'next/link';
import Image from 'next/image';
import AddToCart from '../products/_components/AddToCart/AddToCart';
import { formatCurrency } from '@/Utilities/formatPrice';
export default function Wishlist() {
   const{isLoading,wishlistData}= useContext(WishlistContext);
  return (
   <>
  <div className="flex flex-wrap">
     {isLoading?<Loading/>:
   wishlistData?.data.map((item)=>
    <div key={item._id} className='w-full md:w-1/2 lg:w-1/4 p-1'>
   
      <Card className=' '>
         <Link href={'/products/'+item._id}>
        <Image src={item.imageCover} className='w-full' alt='' width={300} height={300}/>
  <CardHeader className='pt-3'>
    <CardTitle className='line-clamp-1'>{item.title}</CardTitle>
    <CardDescription>{item.category.name}</CardDescription>
    <CardAction>{item.brand.name}</CardAction>
  </CardHeader>
  <CardContent>
   <div className="flex justify-between">
    <div className='flex'>
      

    </div>
   <p><span className='font-bold'>{formatCurrency(item.price)} </span></p>
   </div>
  </CardContent>
  </Link>
 <AddToCart productId={item._id}/>
</Card>
    
    </div>


)}
   
  </div>
   
   </>
  )
}
