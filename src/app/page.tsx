"use client";
import ProductCard from "@/components/ProductCard";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperClass } from "swiper/types";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Star from "@/components/Star";
import SwiperButtons from "@/components/SwiperButtons";
import { useDispatch } from "react-redux";
import { fetchAllProducts } from "@/redux/slices/productSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import Loading from "@/components/Loading";
import { Product } from "@/redux/types";
import Link from "next/link";

export default function Home() {
  const [swiperInstance, setSwiperInstance] = useState<SwiperClass | null>( null );
  const loading = useSelector((state: RootState) => state.products.inProgressFetchAll);
  const error = useSelector((state: RootState) => state.products.error);

  const dispatch = useDispatch<AppDispatch>()

  const Products = useSelector((state:RootState)=> state.products.products)


 
  useEffect(()=>{
    dispatch(fetchAllProducts({ page: 1, limit: 4 }))
  },[])
  
  
  

  // Define a common type for the discount object

  // Define a type for testimonials
  type Testimonial = {
    name: string;
    verified: boolean;
    rating: number;
    text: string;
  };

  // Apply the types to your arrays
  
  
  const newArrivals:Product[] = Products
  const TopSellings:Product[] = Products

  // const newArrivals: Product[] = [
  //   {
  //     name: "T-SHIRT WITH TAPE DETAILS fullslievve",
  //     price: 120,
  //     image: "/images/product/image 7.png",
  //     rating: 4,
  //   },
  //   {
  //     name: "SKINNY FIT JEANS",
  //     price: 260,
  //     discount: {
  //       discount: 20,
  //       discountPrice: 240,
  //     },
  //     image: "/images/product/image 8.png",
  //     rating: 4.8,
  //   },
  //   {
  //     name: "CHECKERED SHIRT",
  //     price: 180,
  //     image: "/images/product/image 9.png",
  //     rating: 4.5,
  //   },
  //   {
  //     name: "SLEEVE STRIPED T-SHIRT",
  //     price: 260,
  //     discount: {
  //       discount: 20,
  //       discountPrice: 240,
  //     },
  //     image: "/images/product/image 10.png",
  //     rating: 4.5,
  //   },
  // ];





  
  // const TopSellings: Product[] = [
  //   {
  //     name: "VERTICAL STRIPED SHIRT",
  //     price: 232,
  //     image: "/images/product/image 7 (1).png",
  //     rating: 5.0,
  //     discount: {
  //       discount: 20,
  //       discountPrice: 212,
  //     },
  //   },

  //   {
  //     name: "COURAGE GRAPHIC T-SHIRT",
  //     price: 260,
  //     image: "/images/product/image 8 (1).png",
  //     rating: 4.0,
  //   },
  //   {
  //     name: "LOOSE FIT BERMUDA SHORTS",
  //     price: 180,
  //     image: "/images/product/image 9 (1).png",
  //     rating: 3.0,
  //   },
  //   {
  //     name: "FADED SKINNY JEANS",
  //     price: 260,
  //     image: "/images/product/image 10 (1).png",
  //     rating: 4.5,
  //   },
  // ];

  const testimonials: Testimonial[] = 
  [
    {
      name: "Sarah M.",
      verified: true,
      rating: 5,
      text: "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.",
    },
    {
      name: "Alex K.",
      verified: true,
      rating: 4,
      text: "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.",
    },
    {
      name: "James L.",
      verified: true,
      rating: 5,
      text: "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.",
    },
    {
      name: "Emma W.",
      verified: true,
      rating: 5,
      text: "I love how easy it is to find stylish pieces for every occasion. Shop.co has become my go-to destination for all my fashion needs. Their customer service is also exceptional!",
    },
    {
      name: "John D.",
      verified: true,
      rating: 4,
      text: "I was impressed by the quality of the clothing I received. The styles are trendy, and the fit is perfect. I'll definitely be shopping here again.",
    },
    {
      name: "Maya S.",
      verified: true,
      rating: 5,
      text: "Shop.co has everything I need for my wardrobe, from casual wear to formal dresses. I especially love their collection of workwear — stylish and comfortable!",
    },
  ];

 

  return (
    <>
      <div className="flex flex-col-reverse lg:flex-row justify-center gap-8 lg:gap-16 bg-secondary px-4 sm:px-8 lg:px-20 pt-10">
        {/* Left Section: Text Content */}
        <div className="flex flex-col order-2 lg:order-1 gap-6">
          <h1 className="text-black text-3xl sm:text-4xl lg:text-6xl font-bold">
            FIND CLOTHES <br /> THAT MATCHES <br /> YOUR STYLE
          </h1>
          <p className="text-gray-600 text-sm sm:text-base font-normal">
            Browse through our diverse range of meticulously crafted garments,
            designed <br /> to bring out your individuality and cater to your
            sense of style.
          </p>
          <button className="rounded-full bg-black text-white text-sm sm:text-base w-full sm:w-52 py-3 sm:py-4">
            Shop Now
          </button>

          {/* Statistics Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
            <div className="flex flex-col items-center sm:items-start border-r border-gray-300 pr-0 sm:pr-5">
              <h4 className="text-black text-2xl sm:text-4xl font-bold">
                200+
              </h4>
              <span className="text-sm sm:text-base text-gray-500">
                International Brands
              </span>
            </div>
            <div className="flex flex-col items-center sm:items-start border-r border-gray-300 pr-0 sm:pr-5">
              <h4 className="text-black text-2xl sm:text-4xl font-bold">
                2000+
              </h4>
              <span className="text-sm sm:text-base text-gray-500">
                High-Quality newArrivals
              </span>
            </div>
            <div className="flex flex-col items-center sm:items-start">
              <h4 className="text-black text-2xl sm:text-4xl font-bold">
                30,000+
              </h4>
              <span className="text-sm sm:text-base text-gray-500">
                Happy Customers
              </span>
            </div>
          </div>
        </div>

        {/* Right Section: Image */}
        <div className="relative order-1 lg:order-2 flex justify-center">
          <Image
            src="/images/Rectangle 2.png"
            alt="Background"
            height={500}
            width={600}
            quality={100}
            className="w-full object-contain"
            
          />

          <Image
            src="/images/Vector-1.png"
            alt="Decorative Vector"
            width={56}
            height={56}
            quality={100}
            className="absolute md:bottom-1/2 md:right-full left-5   sm:bottom-1/2 object-contain "
          />

          <Image
            src="/images/Vector-1.png"
            alt="Decorative Vector"
            width={100}
            height={100}
            quality={100}
            className="absolute top-12 right-5  sm:block object-contain"
          />
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-28 items-center py-5 px-5 bg-black min-h-32 text-white">
        <Image
          src="/images/Vector (4).png"
          alt="Decorative Vector"
          width={166}
          height={33}
          quality={100}
          className="object-contain"
        />

        <Image
          src="/images/Vector (5).png"
          alt="Decorative Vector"
          width={91}
          height={37.98}
          quality={100}
          className="object-contain"

        />

        <Image
          src="/images/Vector (7).png"
          alt="Decorative Vector"
          width={156}
          height={32}
          quality={100}
          className="object-contain"

        />

        <Image
          src="/images/Group.png"
          alt="Decorative Vector"
          width={194}
          height={31.2}
          quality={100}
          className="object-contain"

        />

        <Image
          src="/images/Group (1).png"
          alt="Decorative Vector"
          width={206}
          height={33}
          quality={100}
          className="object-contain"

        />
      </div>

      <section id="new-arrival" className="bg-white py-16 px-14">
        <h1 className="text-5xl font-bold text-black text-center">
          NEW ARRIVALS
        </h1>

        {loading && <Loading/>}
      {error && <p className="error">Error: {error}</p>}
      {!loading && !error && Products.length === 0 && <p>No products available.</p>}

        <div className="flex flex-wrap justify-center gap-6 py-14">
          {newArrivals.map((product, index) => (
            <ProductCard
              key={index}
              product={product}
              // className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4 max-w-full"
            />
          ))}
        </div>

        <div className="flex justify-center ">
          <Link href={"/category"} className="border flex justify-center items-center bg-white text-black  hover:bg-black hover:text-white rounded-full w-56 h-12">
            <span>View All</span>
          </Link>
        </div>

        <hr className="my-10 border-t border-gray-300 w-full max-w-[calc(100%-2rem)] mx-auto" />
      </section>

      <section id="top-selling" className="bg-white py-5 pb-10 px-14">
        <h1 className="text-5xl font-bold text-black text-center">
          TOP SELLING
        </h1>

        <div className="flex flex-wrap justify-center gap-6 py-14">
          {TopSellings.map((product, index) => (
            <ProductCard
              key={index}
              product={product}
              // className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4 max-w-full"
            />
          ))}
        </div>

        <div className="flex justify-center">
        <Link href={"/category"} className="border flex justify-center items-center bg-white text-black  hover:bg-black hover:text-white rounded-full w-56 h-12">
            <span>View All</span>
          </Link>
        </div>
      </section>

      <section className="md:px-28  bg-white">
        <div className="bg-secondary py-10 rounded-3xl  px-20">
          <h1 className="text-black text-5xl font-bold text-center py-10">
            BROWSE BY DRESS STYLE
          </h1>

          <div className="flex flex-col gap-8">
            {/* First Row */}
            <div className="hidden md:flex gap-4">
              {/* Smaller Image - Casual */}
              <div className="flex flex-col bg-white rounded-3xl  md:w-1/3">
                <span className="text-black text-2xl font-bold pl-4 pt-4">
                  Casual
                </span>
                <Image
                  src="/images/product/image 11.png"
                  alt="Casual"
                  width={407}
                  height={289}
                  // objectFit="cover"
                  quality={100}
                  className="w-full h-full rounded-b-3xl object-cover"
                />
              </div>

              {/* Larger Image - Formal */}
              <div className="flex flex-col bg-white rounded-3xl md:w-2/3">
                <span className="text-black text-2xl font-bold pl-4 pt-4">
                  Formal
                </span>
                <Image
                  src="/images/product/image 13.png"
                  alt="Formal"
                  width={684}
                  height={289}
                  // objectFit="cover"
                  quality={100}
                  className="w-full h-full rounded-b-3xl object-cover"
                />
              </div>
            </div>

            {/* Second Row */}
            <div className="hidden md:flex gap-4">
              {/* Larger Image - Party */}
              <div className="flex flex-col bg-white rounded-3xl md:w-2/3">
                <span className="text-black text-2xl font-bold pl-4 pt-4">
                  Party
                </span>
                <Image
                  src="/images/product/image 12.png"
                  alt="Party"
                  width={684}
                  height={289}
                  // objectFit="cover"
                  quality={100}
                  className="w-full h-full rounded-b-3xl object-cover"
                />
              </div>

              {/* Smaller Image - Gym */}
              <div className="flex flex-col bg-white rounded-3xl md:w-1/3">
                <span className="text-black text-2xl font-bold pl-4 pt-4">
                  Gym
                </span>
                <Image
                  src="/images/product/image 14.png"
                  alt="Gym"
                  width={407}
                  height={289}
                  // objectFit="cover"
                  quality={100}
                  className="w-full h-full rounded-b-3xl object-cover"
                />
              </div>
            </div>

            {/* Mobile Layout */}
            <div className="flex flex-col gap-4 md:hidden">
              {/* Casual */}
              <div className="flex flex-col bg-white rounded-3xl w-full h-[18rem]">
                <span className="text-black text-xl font-bold pl-4 pt-2">
                  Casual
                </span>
                <Image
                  src="/images/product/image 11.png"
                  alt="Casual"
                  // layout="responsive"
                  width={400}
                  height={300}
                  // objectFit="cover"
                  className="rounded-b-3xl object-cover"
                />
              </div>

              {/* Formal */}
              <div className="flex flex-col bg-white rounded-3xl w-full h-[18rem]">
                <span className="text-black text-xl font-bold pl-4 pt-2">
                  Formal
                </span>
                <Image
                  src="/images/product/image 13.png"
                  alt="Formal"
                  layout="responsive"
                  width={400}
                  height={300}
                  // objectFit="cover"
                  className="rounded-b-3xl object-cover"
                />
              </div>

              {/* Party */}
              <div className="flex flex-col bg-white rounded-3xl w-full h-[18rem]">
                <span className="text-black text-xl font-bold pl-4 pt-2">
                  Party
                </span>
                <Image
                  src="/images/product/image 12.png"
                  alt="Party"
                  layout="responsive"
                  width={400}
                  height={300}
                  // objectFit="cover"
                  className="rounded-b-3xl object-cover"
                />
              </div>

              {/* Gym */}
              <div className="flex flex-col bg-white rounded-3xl w-full h-[18rem]">
                <span className="text-black text-xl font-bold pl-4 pt-2">
                  Gym
                </span>
                <Image
                  src="/images/product/image 14.png"
                  alt="Gym"
                  // layout="responsive"
                  width={400}
                  height={300}
                  // objectFit="cover" 
                  className="rounded-b-3xl object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="w-full max-w-7xl mx-auto py-10 px-2 relative">
          {/* Flex container for heading and Swiper buttons */}
          <div className="flex items-center justify-between px-5 mb-6">
            <h2 className="text-5xl text-black font-bold">
              OUR HAPPY CUSTOMERS
            </h2>
            {/* Pass the swiper instance to SwiperButtons */}
            {testimonials.length > 0 && (
              <SwiperButtons swiper={swiperInstance} />
            )}
          </div>

          {/* Swiper Component */}
          {testimonials.length === 0 ? (
            <p className="px-10 text-gray-500 my-20">
              No testimonials available yet.
            </p>
          ) : (
            <Swiper
              onSwiper={setSwiperInstance} // Set the swiper instance
              spaceBetween={30}
              modules={[Pagination, Navigation, A11y]}
              breakpoints={{
                320: { slidesPerView: 1, spaceBetween: 10 },
                768: { slidesPerView: 2, spaceBetween: 20 },
                1024: { slidesPerView: 3, spaceBetween: 20 },
                1280: { slidesPerView: 4, spaceBetween: 40 },
              }}
              className="mySwiper"
            >
              {testimonials.map((testimonial, index) => (
                <SwiperSlide key={index} className="flex flex-col h-full">
                  <div className="bg-white p-6  rounded-lg shadow-lg flex flex-col h-full border">
                    <div className="flex text-yellow-500 text-lg mb-4">
                      <Star star={testimonial.rating} />
                    </div>
                    <div className="flex items-center mb-2">
                      <h3 className="text-lg font-bold text-black">
                        {testimonial.name}
                      </h3>
                      {testimonial.verified && (
                        <span className="ml-2 bg-green-500 text-xs rounded-full px-1">
                          ✔
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm">{testimonial.text}</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </section>
    </>
  );
}
