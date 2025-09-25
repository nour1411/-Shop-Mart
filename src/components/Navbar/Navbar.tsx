"use client"
import React, { useContext } from 'react'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  
} from "@/components/ui/navigation-menu"
import Link from 'next/link'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { HeartIcon, Loader2, Loader2Icon, ShoppingCartIcon, UserIcon } from 'lucide-react'

import { CartContext } from '../Context/CartContext'
import { WishlistContext } from '../Context/WishlistContext'
import { signOut, useSession } from 'next-auth/react'


export default function Navbar() {

  const session =useSession();

  console.log(session);
  
  const {cartData,isLoading}=useContext(CartContext);
 const{wishlistData}=useContext(WishlistContext);
  
  return<>
  <nav className='py-3 bg-gray-100 text-2xl font-semibold sticky top-0'>

    <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-black flex items-center justify-center mr-3">
      <span className='text-white font-bold text-2xl'>S</span>
     </div>
              <h1><Link href={'/'}>ShopMart</Link></h1>
          </div>
          
  <NavigationMenu>
  <NavigationMenuList>
     <NavigationMenuItem>
      <NavigationMenuLink asChild>
        <Link href="/products">Products</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
     <NavigationMenuItem>
      <NavigationMenuLink asChild>
        <Link href="/categories">Categories</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
     <NavigationMenuItem>
      <NavigationMenuLink asChild>
        <Link href="/brands">Brands</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>

  <div className="flex items-center gap-2 ">
       {session.status=='authenticated'&&
       <>
       <h2>Hi, {session.data.user.name}</h2>
       </>
       }
    <DropdownMenu>
  <DropdownMenuTrigger className='outline-0 cursor-pointer'><UserIcon/></DropdownMenuTrigger>
  <DropdownMenuContent>

      
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
   

      {session.status=='authenticated'?<>
        <Link href={'/profile'}>
    <DropdownMenuItem>Profile</DropdownMenuItem>
    </Link>
       <DropdownMenuItem onClick={()=>signOut({
      callbackUrl:'/'
    })}>Logout</DropdownMenuItem>
      
      </>:
      
      <>
      
      <Link href={'/login'}>
    <DropdownMenuItem>Login</DropdownMenuItem>
    </Link>
      
      
    <Link href={'/register'}>
    <DropdownMenuItem>Register</DropdownMenuItem>
    </Link>
    
      </>
      
      }

  </DropdownMenuContent>
</DropdownMenu>

{session.status=="authenticated"
&&
<>
<Link href={'/cart'} className=" py-2 relative">
    <ShoppingCartIcon/>
     <div className="rounded-full absolute -top-1/6 -end-1/4
     flex justify-center items-center text-sm bg-accent-foreground text-accent size-3 p-2.5">
          <span>{isLoading?<Loader2 className='animate-spin size-2'/> : cartData?.numOfCartItems??0}</span>
        </div>
</Link>
<Link href={'/wishlist'} className=" py-2 relative">
    <HeartIcon/>
     <div className="rounded-full absolute -top-1/6 -end-1/4
     flex justify-center items-center text-sm bg-accent-foreground text-accent size-3 p-2.5">
          <span>{isLoading?<Loader2Icon className='animate-spin size-2'/> : wishlistData?.count??0}</span>
        </div>
</Link>
</>
}
  </div>

        </div>
    </div>
  </nav>
  

  </>
}
