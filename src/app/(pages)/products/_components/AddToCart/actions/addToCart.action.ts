"use server"
import { CartResponse } from "@/interfaces/cardInterface";
import { getUserToken } from "@/Utilities/getToken";

export async function addToCartAction(productId:string){

   const token =await getUserToken();
   const response=await fetch(`https://ecommerce.routemisr.com/api/v1/cart`,{
      method:"POST",
      body:JSON.stringify({productId}),
      headers:{
        token:token+'',
        "Content-type": "application/json"
      }
    })
    const payload: CartResponse=await response.json();

    return payload ;
}