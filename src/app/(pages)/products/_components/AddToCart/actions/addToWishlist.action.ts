"use server"

import { getUserToken } from "@/Utilities/getToken";

export async function addToWishlistAction(productId:string){
 const token =await getUserToken();
 const response=await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
      method:"POST",
      body:JSON.stringify({productId}),
      headers:{
        token:token+'',
        "Content-type": "application/json"
      }
    });
    const payload=await response.json();

    return payload ;
}