
import React from 'react'

export default function Loading() {
  return <>
  
   <div className='min-h-[80vh] flex justify-center items-center bg-white'>
   <div className="text-center">
    <div className="flex items-center justify-center mb-8">
     <div className="w-12 h-12 bg-black flex items-center justify-center mr-3">
      <span className='text-white font-bold text-2xl'>S</span>
     </div>
<span className='text-black font-bold text-3xl'>ShopMart</span>
</div>


     <div className="relative">
      <div className="w-16 h-16 border-4
       border-gray-200 border-t-black 
       rounded-full animate-spin mx-auto mb-4  "></div>
      <div className="w-12 h-12 border-4
       border-gray-100 border-t-gray-400  rounded-full animate-spin
        mx-auto absolute top-2 left-1/2 transform -translate-x-1/2"></div>
     </div>

    </div>
   </div>
    
  
  </>
}
