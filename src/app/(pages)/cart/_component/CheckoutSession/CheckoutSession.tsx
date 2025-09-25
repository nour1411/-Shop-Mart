"use client";
import { Button } from "@/components/ui/button";
import React, { useRef, useState } from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { getUserToken } from "@/Utilities/getToken";
export default function CheckoutSession({ cartId }: { cartId: string }) {
  const city = useRef<HTMLInputElement>(null);
  const details = useRef<HTMLInputElement>(null);
  const phone = useRef<HTMLInputElement>(null);
  console.log(location);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  async function checkOut() {
    const token = await getUserToken();
    setIsLoading(true);
    const shippingAddress = {
      city: city.current?.value,
      details: details.current?.value,
      phone: phone.current?.value,
    };

    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${location.origin}`,
      {
        method: "POST",
        body: JSON.stringify({ shippingAddress }),
        headers: {
          token:token+'',
          "Content-Type": "application/json",
        },
      }
    );
    const payload = await response.json();
    location.href = payload.session.url;
    console.log(payload);
    setIsLoading(false);
  }
  async function createCashOrder() {
    const token = await getUserToken();
    setIsLoading(true);
    const shippingAddress = {
      city: city.current?.value,
      details: details.current?.value,
      phone: phone.current?.value,
    };

    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/orders/` + cartId,
      {
        method: "POST",
        body: JSON.stringify({ shippingAddress }),
        headers: {
          token:token+'',
          "Content-Type": "application/json",
        },
      }
    );
    const payload = await response.json();

    console.log(payload);
    setIsLoading(false);
    if(payload.status==="success"){
      location.href="/allorders"
    }
  }

  return (
    <>
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <Button className="w-full mt-5 ">Proceed to Checkout</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Address</DialogTitle>
              <DialogDescription>Shipping Address</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="city">City</Label>
                <Input ref={city} id="city" name="city" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="details">Details</Label>
                <Input ref={details} id="details" name="details" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="phone">Phone</Label>
                <Input ref={phone} id="phone" name="phone" />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={createCashOrder}>CheckOut (cash)</Button>
              <Button onClick={checkOut}>
                CheckOut (
                {isLoading ? <Loader2 className="animate-spin" /> : "Visa"})
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </>
  );
}
