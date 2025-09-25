import { BrandI } from '@/interfaces/brand';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

export default async function Brands() {
    
  const response=await fetch(`https://ecommerce.routemisr.com/api/v1/brands`,
  {
   next:{
    revalidate:10*60
   }
  }
 );
 const {data:brands}:{data:BrandI[]} =await response.json();
 
 console.log(brands);
 

  return <>
   <div className='text-center'>
      <h2 className="text-2xl  font-bold m-5">Our Brands</h2>
       <p className=" text-gray-500 mb-6">
    Explore top brands and find products you trust
  </p>

   </div>
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {brands.map((brand) => 
        <div key={brand._id} className="border rounded-2xl p-4 cursor-pointer">
          <Link href={'/brands/'+brand._id}>
          <Image width={200} height={200} src={brand.image} alt={brand.name} className="w-20 h-20 object-contain mx-auto" />
          <p className="text-center mt-2">{brand.name}</p>
          </Link>
        </div>
      )}
    </div>
 
  
  </>
}


