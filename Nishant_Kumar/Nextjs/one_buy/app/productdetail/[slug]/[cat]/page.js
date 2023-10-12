"use client";
import React from "react";
import Wrapper from "@/components/Wrapper";
import Image from "next/image";
import CardPoster from "../../../../components/CardPoster"
import StarRatings from "react-star-ratings";
import MultiCrousel from "@/components/MultiCrousel";
import { useParams } from 'next/navigation';
import { useState } from "react";
import { fetchdata } from "@/utils/api";
import { useEffect } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { useSelector , useDispatch } from "react-redux";
import { additem } from "@/store/Cartslice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ProductDetail = () => {

  const dispatch = useDispatch();

  const params = useParams();
  const {slug} = params;
  const {cat} = params

  const [cate, setcate] = useState(null)
  const [showalert, setshowalert] = useState(true)

  useEffect(()=>{
    fetchcatdata();
    console.log(cate?.[0]?.attributes)
    console.log(slug)
  },[])

  const fetchcatdata = async()=>{
    const res = await fetchdata(`/api/products?populate=*&[filters][slug][$eqi]=${cat}`);
    setcate(res?.data)
  }

  const notify = ()=>{
    toast.success('Sucess Added to cart', {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
  }

    

  const alertcheck=()=>
  {
    setshowalert(false)
  }


  return (
    <Wrapper>
      <ToastContainer/>
    <div className="md:flex m-10 ">
    <CardPoster data = {cate?.[0]?.attributes?.image?.data}/>
    <div className="m-2  md:max-w-[400px]">
    <h1 className="text-center text-xl font-medium">{cate?.[0]?.attributes?.name}</h1>
    <div className=" mt-2 flex  items-center "><StarRatings
          rating={4}
          starRatedColor="yellow"
          numberOfStars={5}
          starDimension="20px"
          starSpacing="3px"
          name='rating'
        />
    <h3 className="text-[15px] mt-1 "> | 2136 Reviews | 4523 sold </h3>
    </div>
    <h2 className="text-3xl mt-2  font-bold mb-2">₹{cate?.[0]?.attributes?.price}</h2>
    <hr />
    <h3 className="text-white opacity-40 mt-2">Select Colour</h3>
    <div className=" flex mt-2 gap-8">
        <div>
        <button className={`bg-white cursor-pointer  h-[40px] w-[100px] text white rounded-sm text-white focus:outline-none focus:ring focus:ring-violet-700`} onClick={()=>alertcheck()}></button>
        <h3 className="mx-6 mt-1">White</h3>
        </div>
        <div>
        <button className={`bg-Grey cursor-pointer h-[40px] w-[100px] text white rounded-sm text-white focus:outline-none focus:ring focus:ring-violet-300`} onClick={()=>alertcheck()}></button>
        <h3 className="mx-6 mt-1">Black</h3>
        </div>
    </div>
    {
      (showalert)?<h4 className="text-red mt-2 text-sm">Please Select a Colour</h4>:""
    }
    <h2 className="text-xl text-white font-medium mt-4">Description</h2>
    <div>
    <ReactMarkdown>
      {cate?.[0]?.attributes?.description}
    </ReactMarkdown>
      </div>
    <div className=" flex gap-8 mt-2">
  <button className=" h-[50px] w-[100px] rounded-sm bg-white mt-4  text-black font-semibold hover:text-white hover:bg-Grey transition-transform active:scale-105" onClick={()=>{dispatch(additem({...cate?.[0] , oneQuantityprice : cate?.[0]?.attributes?.price})); notify()}}>Add to cart</button>
    </div>
    </div>
    </div>
    <h1 className="mb:text-2xl text-xl font-medium mb-4">You Also Like This</h1>
    <MultiCrousel/>
    </Wrapper>
  );
};

export default ProductDetail;
