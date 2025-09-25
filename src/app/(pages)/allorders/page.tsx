"use client"
import React, { useEffect, useState } from 'react'
import { jwtDecode } from "jwt-decode";
import Image from 'next/image';
import Loading from '@/app/loading';
import { OrderI } from '@/interfaces/order';
import { formatCurrency } from '@/Utilities/formatPrice';
import { getUserToken } from '@/Utilities/getToken';

export default function AllOrders() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [orders, setOrders] = useState<OrderI[]>([])

  async function getAllOrders() {
    setIsLoading(true)

  
    const incodedToken = await getUserToken()
    if (!incodedToken) {
      console.log("no token found")
      setIsLoading(false)
      return
    }

    const { id }: { id: string } = jwtDecode(incodedToken)

   
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
    const payload = await response.json()
    console.log(payload)

    setOrders(payload)
    setIsLoading(false)
  }

  useEffect(() => {
    getAllOrders()
  }, [])

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="rounded-xl border p-4 shadow-sm bg-card mb-6"
          >
            <div className="flex justify-between items-center mb-3">
              <p className="text-sm text-muted-foreground">
                {order.createdAt.split("T", 1)}
              </p>
              <p
                className={
                  order.isPaid
                    ? "text-emerald-500 font-semibold"
                    : "text-red-500 font-semibold"
                }
              >
                {order.isPaid ? "Paid" : "Not Paid"}
              </p>
            </div>

            <div className="flex flex-col gap-4">
              {order.cartItems.map((cartItem) => (
                <div
                  key={cartItem._id}
                  className="flex gap-4 items-center border-b pb-3 last:border-b-0"
                >
                  <Image
                    width={100}
                    height={100}
                    src={cartItem.product.imageCover}
                    alt={cartItem.product.title}
                    className="w-24 h-24 rounded-lg object-cover md:w-28 md:h-28"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-base md:text-lg line-clamp-2">
                      {cartItem.product.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mt-1">
                      {cartItem.product.brand.name} ·{" "}
                      {cartItem.product.category.name}
                    </p>
                    <p className="mt-1 text-sm">
                      {formatCurrency(cartItem.price)} × {cartItem.count}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </>
  )
}
