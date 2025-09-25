"use server"

import { getUserToken } from "@/Utilities/getToken";

export async function removeFromWishlistAction(productId:string){
 const token =await getUserToken();
 const response=await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,{
      method:"DELETE",
      headers:{
        token:token+'',
        "Content-type": "application/json"
      }
    });
    const payload=await response.json();

    return payload ;
}