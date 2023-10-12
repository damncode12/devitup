'use client'
import Wrapper from "@/components/Wrapper"
import HeroBanner from "@/components/HeroBanner"
import ProductCard from "@/components/ProductCard"
import { fetchdata } from "@/utils/api"
import { useEffect } from "react"
import { useState } from "react"

export default function Home({products}) {

  // Traditional way to fetch the data but this won't help in the SEO rating of webpage

  const [Data, setData] = useState(null)
  useEffect(()=>{
    fetchprod();
  },[])

  const fetchprod = async()=>{
    const {data} = await fetchdata('/api/products?populate=*')
    console.log(data?.[0]?.attributes?.thumbnail?.data?.attributes?.url);
    setData(data);
  }

  return (
    <div className="">
    <Wrapper>
      
    <HeroBanner/>
    <div className="text-center">
    {/* <h1 className="text-white">{Data?.[0]?.attributes?.name}</h1> */}
    <h1 className="text-4xl font-bold mb-4 mt-4">Sale the World through us</h1>
    <div className="mb-2">We are the leading platform in the world of ecommerce <br/> Feel Free to 
      buy anything and leave the quality to us 
    </div>
    </div>
    {/* imgurl={item?.attributes?.thumbnail?.data?.attributes?.url} */}
    <div className="grid grid-cols-1 md:grid-cols-2 mt-10 mb-5 lg:grid-cols-3 gap-4 px-5">
      {
        Data?.map((item)=>{
          return(<ProductCard key={item.id} Title={item?.attributes?.name} slug={item?.attributes?.slug} imgurl={item?.attributes?.thumbnail?.data?.attributes?.url} id={item?.attributes?.category?.data?.attributes?.slug} Price={item?.attributes?.price} />
          )
        })
      }
    </div>
    </Wrapper>
    </div>
  )
}

// Here we will use the SSG (static site generation) for fetching the data
// we use this when we are using a headless CMS (like Strapi) and a CDN (cloudinary)


// export async function getStaticProps()
// {
//   const products = await fetchdata('/api/products')
//   return {
//     props : {products}
//   }
// }