import type { Categories } from '@/interfaces/categories';
import Image from 'next/image';
import Link from 'next/link';

import React from 'react'

export default async function Categories() {

  const response= await fetch(`https://ecommerce.routemisr.com/api/v1/categories`,{
    next:{
      revalidate:10*60
    }
  });

  const {data:categories}:{data:Categories[]}=await response.json();
  console.log(categories);
  


  return <>
  <div className='text-center'>
      <h2 className="text-2xl  font-bold m-5">Our Categories</h2>
       <p className=" text-gray-500 mb-6">
  Choose a category and explore its products
  </p>
   </div>
   <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
      {categories.map((category) => 
        <div key={category._id} className=" w-50 h-50 border flex items-center justify-center rounded-full p-4 cursor-pointer">
          <Link href={'/categories/'+category._id}>
          <Image width={200} height={200} src={category.image} alt={category.name} className="w-32 h-32 object-contain mx-auto p-2" />
          <p className="text-center mt-2">{category.name}</p>
          </Link>
        </div>
      )}
    </div>
 
  </>
}
