"use client"
import Loading from '@/app/loading'
import { CartContext } from '@/components/Context/CartContext'
import { Button } from '@/components/ui/button'
import { CartResponse } from '@/interfaces/cardInterface'
import { formatCurrency } from '@/Utilities/formatPrice'
import { Loader2, Trash2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast'
import CheckoutSession from '../CheckoutSession/CheckoutSession'
import { getUserToken } from '@/Utilities/getToken'



export default function InnerCart() {
    const {cartData,isLoading,getCart,setCartData}=useContext(CartContext);

   
  const [isClearing, setIsClearing] = useState<boolean>(false)
  const [isRemovingId, setIsRemovingId] = useState<null|string>(null)
  const [isUpdatingId, setIsUpdatingId] = useState<null|string>(null)
   
  if (cartData) {
    if (typeof cartData?.data.products[0].product==='string') {
    getCart();
  }
  
  }
  
  async function clearCart() {
      setIsClearing(true);
      const token =await getUserToken();
      const response= await fetch(`https://ecommerce.routemisr.com/api/v1/cart`,{
        method:"DELETE",
        headers:{
          token:token+''
        }
      });

      const payload=await response.json();
      console.log(payload);
       setCartData(null)
       setIsClearing(false);
    }
    
    async function removeCartItem(productId:string) {
       const token =await getUserToken();
      setIsRemovingId(productId);
      const response= await fetch(`https://ecommerce.routemisr.com/api/v1/cart/`+productId,{
        method:"DELETE",
        headers:{
          token: token+''
        }
      });

      const payload:CartResponse=await response.json();
      console.log(payload);
      toast.success('product removed successfully')
      if(payload.numOfCartItems>0){
         setCartData(payload);
      }
      else{
        setCartData(null);
      }
       setIsRemovingId(null);
    }

    async function updateCartItemCount(productId:string,count:number) {
       const token =await getUserToken();
      setIsUpdatingId(productId);
      const response= await fetch(`https://ecommerce.routemisr.com/api/v1/cart/`+productId,{
        method:"PUT",
        body:JSON.stringify({count}),
        headers:{
          token:token+'',
          "Content-Type":"application/json"
        }
      });

      const payload:CartResponse=await response.json();
      console.log(payload);
       setCartData(payload);
      
       setIsUpdatingId(null);
    }
   
  return <>
  {isLoading ? (
      <Loading />
    ) : cartData && cartData?.numOfCartItems ? (
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold tracking-tight">ShoppingCart</h1>
        <p className="text-muted-foreground mt-1">
          {cartData?.numOfCartItems} items in your cart
        </p>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-start mt-6">
          {/* items */}
          <div className="lg:col-span-2 space-y-6">
            {cartData?.data.products.map((item) => (
              <div
                key={item._id}
                className="flex gap-4 rounded-xl border p-4 shadow-sm bg-card"
              >
                <Image
                  width={100}
                  height={100}
                  src={item.product.imageCover}
                  alt={item.product.title}
                  className="w-24 h-24 rounded-lg object-cover md:w-28 md:h-28"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                    <h3 className="font-semibold text-base md:text-lg line-clamp-2">
                      {item.product.title}
                    </h3>
                    <div className="min-w-0">
                      <span className="font-semibold">
                        {formatCurrency(item.price)}
                      </span>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm mt-1">
                    {item.product.brand.name} · {item.product.category.name}
                  </p>

                  <div className="flex justify-between mt-3">
                    <div className="flex gap-4">
                      <button
                        disabled={
                          isUpdatingId === item.product.id || item.count == 1
                        }
                        onClick={() =>
                          updateCartItemCount(item.product.id, item.count - 1)
                        }
                        aria-label="decrease"
                        className="border size-8 rounded-lg font-medium hover:bg-gray-50 cursor-pointer"
                      >
                        -
                      </button>
                      <span>
                        {isUpdatingId === item.product.id ? (
                          <Loader2 className="animate-spin" />
                        ) : (
                          item.count
                        )}
                      </span>
                      <button
                        disabled={
                          isUpdatingId === item.product.id &&
                          item.product.quantity == item.count
                        }
                        onClick={() =>
                          updateCartItemCount(item.product.id, item.count + 1)
                        }
                        aria-label="increase"
                        className="border rounded-lg size-8 font-medium hover:bg-gray-50 cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                    <button
                      aria-label="remove"
                      onClick={() => removeCartItem(item.product.id)}
                      disabled={isRemovingId === item.product.id}
                      className="text-sm text-red-500 hover:underline flex gap-1 "
                    >
                      {isRemovingId === item.product.id && (
                        <Loader2 className="animate-spin" />
                      )}{" "}
                      remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* summary */}
          <div className="lg:col-span-1 sticky top-16">
            <div className="rounded-xl border p-5 shadow-sm">
              <h2 className="text-lg font-semibold"> Order Summary</h2>
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    SubTotal ({cartData?.numOfCartItems} items)
                  </span>
                  <span className="font-semibold">
                    {formatCurrency(cartData?.data?.totalCartPrice)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Shipping
                  </span>
                  <span className="font-medium text-emerald-600">Free</span>
                </div>
              </div>

              <div className="my-4 border-t"></div>

              <div className="flex items-center justify-between">
                <span className="text-base font-semibold">Total</span>
                <span className="text-base font-bold">
                  {formatCurrency(cartData?.data?.totalCartPrice)}
                </span>
              </div>

              <CheckoutSession cartId={cartData.cartId} />

              <button className="w-full border cursor-pointer mt-5 h-11 rounded-xl bg-transparent text-primary font-medium hover:bg-gray-50 ">
                Continue Shopping
              </button>
            </div>
            <Button
              disabled={isClearing}
              onClick={clearCart}
              variant={"outline"}
              className="mt-2 text-destructive hover:text-destructive cursor-pointer ms-auto flex"
            >
              {isClearing ? (
                <Loader2 className="animate-spin" />
              ) : (
                <Trash2 />
              )}{" "}
              Clear Cart
            </Button>
          </div>
        </div>
      </div>
    ) : (
      <div className="min-h-[80vh] flex gap-4 flex-col justify-center items-center">
        <h2 className="font-bold text-3xl">Your Cart Is Empty</h2>
        <Button>
          <Link href={"/products"}>Add Ones</Link>
        </Button>
      </div>
    )}
  </>
  
}
