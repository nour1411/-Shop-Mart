import { Categories } from '@/interfaces/categories'
import { ProductI } from '@/interfaces/product'
import React from 'react'

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import AddToCart from '../../products/_components/AddToCart/AddToCart'
import { formatCurrency } from '@/Utilities/formatPrice'
import Image from 'next/image'
import Link from 'next/link'

export default async function CategoryPage({ params }: { params: { categoryId: string } }) {
      const { categoryId } = params
        
          const brandResponse = await fetch(`https://ecommerce.routemisr.com/api/v1/brands/`+categoryId, {
            next: { revalidate: 10 * 60 }
          })
          const { data: categories}: { data:Categories } = await brandResponse.json()
        
          
          const productResponse = await fetch(`https://ecommerce.routemisr.com/api/v1/products?category=${categoryId}`, {
            next: { revalidate: 10 * 60 }
          })
          const { data: products }: { data: ProductI[] } = await productResponse.json()
  return <>
  
  <div className="flex flex-wrap">
     {products.length>0?
     products.map((product)=>
   <div key={product.id} className='w-full md:w-1/2 lg:w-1/4 p-1'>
   
      <Card className=' '>
         <Link href={'/products/'+product.id}>
        <Image src={product.imageCover} className='w-full' alt='' width={300} height={300}/>
  <CardHeader className='pt-3'>
    <CardTitle className='line-clamp-1'>{product.title}</CardTitle>
    <CardDescription>{product.category.name}</CardDescription>
    <CardAction>{product.brand.name}</CardAction>
  </CardHeader>
  <CardContent>
   <div className="flex justify-between">
    <div className='flex'>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-yellow-300">
  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
</svg>

     <p>{product.ratingsAverage}</p>
    </div>
   <p><span className='font-bold'>{formatCurrency(product.price)} </span></p>
   </div>
  </CardContent>
  </Link>
 <AddToCart productId={product.id}/>
</Card>
    
    </div>
  ):
 <h2 className="text-center text-xl font-semibold my-6">
    No products found in this category
  </h2>
  }
  </div>
   
  
  
  </>
}
