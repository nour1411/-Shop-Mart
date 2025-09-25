import { ProductI } from '@/interfaces/product';
import { Params } from 'next/dist/server/request/params'
import React from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import AddToCart from '../_components/AddToCart/AddToCart';
import { formatCurrency } from '@/Utilities/formatPrice';
import ProductSlider from '../_components/ProductSlider/ProductSlider';


export default async function productDetails({params}:{params:Params}) {

const {productId}= await params;
console.log(productId);

const response = await fetch(`https://ecommerce.routemisr.com/api/v1/products/`+productId)
const{data:product}:{data:ProductI}=await response.json();
console.log(product);

  return <>
  
    <Card className='gap-2'>
       <div className="grid grid-cols-1 md:grid-cols-3 items-center">
          <div className="col-span-1">
          <ProductSlider images={product.images} title={product.title} />
          
             </div>
           <div className="col-span-1 md:col-span-2 space-y-6">
              <CardHeader>
    <CardTitle className='text-2xl'>{product.title}</CardTitle>
    <CardDescription>{product.description}</CardDescription>
    <CardDescription>{product.category.name}</CardDescription>
    <CardDescription>{product.brand.name}</CardDescription>
   
  </CardHeader>
  <CardContent>
   <div className="flex justify-between">
    <div className='flex'>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-yellow-300">
  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
</svg>

     <p>{product.ratingsAverage}</p>
      <span>({product.ratingsQuantity})</span>
    </div>
   <p><span className='font-bold'>{formatCurrency(product.price)}</span>
   
   </p>
   </div>
  </CardContent>

  <AddToCart productId={product.id}/>
           </div>
       </div>
     

</Card>
  
  
  
  </>
}
