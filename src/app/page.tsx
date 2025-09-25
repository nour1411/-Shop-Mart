
import Link from "next/link";

export default function Home() {
  return <>
  
  <section className="bg-white py-20">
 <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
   {/* main heading */}
   <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6">
    Welcome to ShopMart
   </h1>
<p className="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
  Discover the latest technology, fashion and lifestyle products.
  Quality guaranteed with fast and excellent customer service
</p>

<div className="flex flex-col sm:flex-row gap-4 justify-center items-center ">
<Link href="/products"
  className="bg-black text-white px-8 py-3 border-2 border-black rounded-md font-medium
   hover:bg-gray-800 transition-colors duration-200 min-w-[140px] "
>Shop Now</Link>
<Link href="/categories"
  className="bg-white text-black px-8 py-3 border-2 border-black rounded-md font-medium
   hover:bg-gray-100 transition-colors duration-200 min-w-[140px] "
>Browse categories</Link>
</div>

</div>
  </section>

  </>
   
}
