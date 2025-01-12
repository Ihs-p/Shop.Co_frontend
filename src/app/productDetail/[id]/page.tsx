"use client";
import ProductCard from "@/components/ProductCard";
import ColorSelector from "@/components/Colorselector";
import React, { useEffect, useState } from "react";

import Star from "@/components/Star";
import { redirect, useParams } from "next/navigation";
import Loading from "@/components/Loading";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { addToCart } from "@/redux/slices/cartSlice";
import { useSelector } from "react-redux";
import { fetchAllProducts, fetchProduct } from "@/redux/slices/productSlice";
import { Params } from "next/dist/server/request/params";
import { Carts, Product } from "@/redux/types";
import Link from "next/link";
import { toast, Toaster } from "sonner";

export default function Page() {
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("small");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState("about");

  const dispatch = useDispatch<AppDispatch>();

  const params = useParams<Params>();

  const product = useSelector((state: RootState) => state.products.product);
  const loading = useSelector(
    (state: RootState) => state.products.inProgressFetchSingle
  );
  const error = useSelector((state: RootState) => state.products.error);

  const products = useSelector((state: RootState) => state.products.products);



  const isaddedToCart = (id: string) => {
    const carts: Carts = JSON.parse(localStorage.getItem("carts") || "[]");
    return carts.some((cart) => cart._id === id);
  };

  useEffect(() => {
    dispatch(fetchProduct(params.id as string));
    dispatch(fetchAllProducts({ page: 1, limit: 4 }));
  }, []);

  useEffect(() => {
    if (product)
      dispatch(
        fetchAllProducts({
          page: 1,
          limit: 4,
          category: product?.category._id,
          currentProductId: product?._id,
        })
      );
  }, [product]);

  const handleAddtoCart = (item: Product) => {
    
    const cartItem = {
      ...item,
      quantity: quantity,
      color: selectedColor || "white",
      size: selectedSize,
    };


    dispatch(addToCart(cartItem));
    toast.success("added to cart");
  };

  // const handleColorSelect = (color: string) => {
  //   setSelectedColor(color);
  // };

  

  // Define a type for testimonials
  type Testimonial = {
    name: string;
    verified: boolean;
    rating: number;
    text: string;
    post: string;
  };

  // Apply the types to your arrays

  // const TopSellings: Product[] = [
  //   {
  //     _id:"22",
  //     name: "Polo with Contrast Trims",
  //     price: 242,
  //     images: ["/images/product/pdetail1.png"],
  //     rating: 4.0,
  //     discount: {
  //       discount: 20,
  //       discountPrice: 212,
  //     }
  //   },
  //   {
  //     name: "Gradient Graphic T-shirt",
  //     price: 145,
  //     images: ["/images/product/pdetail2.png"],
  //     rating: 3.5,
  //   },
  //   {
  //     name: "Polo with Tipping Details",
  //     price: 180,
  //     images: ["/images/product/pdetail3.png"],
  //     rating: 4.5,
  //   },
  //   {
  //     name: "Black Striped T-shirt",
  //     price: 150,
  //     images: ["/images/product/pdetail4.png"],
  //     rating: 5.0,
  //     discount: {
  //       discount: 30,
  //       discountPrice: 120,
  //     },
  //   },
  // ];

  const TopSellings: Product[] = products;

  const testimonials: Testimonial[] = [
    {
      name: "Samantha D.",
      verified: true,
      rating: 4.5,
      text: "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt.",
      post: "Posted on August 14, 2023",
    },

    {
      name: "Alex M.",
      verified: true,
      rating: 4,
      text: "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me.",
      post: "Posted on August 15, 2023",
    },
    {
      name: "Ethan R.",
      verified: true,
      rating: 5,
      text: "This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt.",
      post: "Posted on August 16, 2023",
    },

    {
      name: " Olivia P.",
      verified: true,
      rating: 5,
      text: "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out.",
      post: "Posted on August 17, 2023",
    },

    {
      name: " Liam K.",
      verified: true,
      rating: 4,
      text: "This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion.",
      post: "Posted on August 18, 2023",
    },

    {
      name: "Ava H.",
      verified: true,
      rating: 5,
      text: "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter.",
      post: "Posted on August 19, 2023",
    },
  ];



  return (
    <> 
      <Toaster />
      <nav
        onClick={() => redirect(`/category`)}
        className="flex px-5 py-3 text-gray-700  bg-gray-50 "
        aria-label="Breadcrumb"
      >
        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
          <li className="inline-flex items-center">
            <a
              href="#"
              className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
            >
              Home
            </a>
          </li>
          <li>
            <div className="flex items-center">
              <svg
                className="rtl:rotate-180 block w-3 h-3 mx-1 text-gray-400 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
              <a
                href="#"
                className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
              >
                Shop
              </a>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <svg
                className="rtl:rotate-180  w-3 h-3 mx-1 text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
              <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">
                Men
              </span>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <svg
                className="rtl:rotate-180  w-3 h-3 mx-1 text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
              <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">
                T-shirt
              </span>
            </div>
          </li>
        </ol>
      </nav>
      {loading && <Loading />}
      {error && <p className="text-center text-red-500"> error...</p>}
      {!error && !product && (
        <p className="text-center text-red-500">product not available</p>
      )}
      {!error && product && (
        /*=============== productDetail ==============*/
        <>
          <section className="md:px-28  bg-white my-10">
            <div className="flex flex-col lg:flex-row ">
              <div className="col">
                <div className="flex flex-col-reverse lg:flex-row   gap-3">
                  <div className="flex  lg:flex-col justify-center   overflow-y-auto max-h-[500px] ">
                    {product?.images.map((image, index, array) => (
                      <div
                        key={index}
                        className={` ${
                          index !== array.length - 1 ? "mb-1" : ""
                        } w-36 h-40 bg-secondary rounded-2xl cursor-pointer ${
                          selectedImage === image ? "ring-2 ring-black" : ""
                        }`}
                        onClick={() => setSelectedImage(image ?? "")}
                      >
                        <img
                          className="h-full w-full object-contain rounded-2xl"
                          src={image}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="  md:w-[430px] h-[500px] bg-secondary rounded-2xl">
                    <img
                      className=" w-full h-full object-cover rounded-2xl"
                      src={selectedImage || product?.images[0]}
                      alt="Tshirt"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col md:ml-10">
                <h1 className="text-black text-4xl font-bold   ">
                  {product?.name}
                </h1>
                <div className="flex items-center gap-1 ">
                  <Star star={product?.rating ?? 0} />
                  <div className="inline">
                    <span className="text-black text-base">
                      {product?.rating}/
                    </span>
                    <span className="text-gray-500 text-base">5</span>
                  </div>
                </div>
                <div className="flex flex-row">
                  {product?.discount ? (
                    <div className="flex gap-4">
                      <span className="text-2xl font-bold text-black mt-1">
                        ${product?.discount?.discountPrice}
                      </span>
                      <span className="text-2xl font-bold text-gray-400 line-through  mt-1">
                        ${product?.price}
                      </span>
                      <div className="bg-red-100 w-16 h-8 mt-1 text-red-600 text-sm rounded-full flex items-center justify-center">
                        -{product?.discount?.discount}%
                      </div>
                    </div>
                  ) : (
                    <div className="flex gap-4">
                      <span className="text-2xl font-bold text-black mt-1">
                        ${product?.price}
                      </span>
                    </div>
                  )}
                </div>

                <p className="text-gray-600 text-sm my-3">
                  {product?.description}
                </p>
                <hr />
                <p className="text-gray-600 text-sm mt-3">Select Color</p>
                <div className="flex flex-wrap">
                  {product.colors.map((color) => (
                    <ColorSelector
                      key={color.name}
                      color={color.name}
                      colorCode={color.code}
                      isSelected={selectedColor === color.name}
                      setSelectedColor={setSelectedColor}
                    />
                  ))}
                </div>
                <hr />
                <p className="text-gray-600 text-sm mt-3">Choose Size</p>
                <div className="flex flex-row  flex-wrap my-3 ">
                  {product.size.map((size, index) => (
                    <span
                      key={index}
                      onClick={() => setSelectedSize(size)}
                      className={`rounded-full ${
                        selectedSize === size
                          ? "bg-black text-white"
                          : "bg-secondary  text-gray-500"
                      } h-11 w-auto me-1 place-content-center px-5 my-1 cursor-pointer`}
                    >
                      {size}
                    </span>
                  ))}
                </div>
                <div className="flex">
                  <div
                    className="flex rounded-full shadow-sm  bg-secondary w-[100] me-1"
                    role="group"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setQuantity(quantity != 1 ? quantity - 1 : quantity)
                      }
                      className="px-4  text-sm font-medium text-black bg-transparent   rounded-full "
                    >
                      <svg
                        className=" text-gray-800  "
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 12h14"
                        />
                      </svg>
                    </button>
                    <span className="px-4  text-xl font-medium text-black flex items-center">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        if (quantity < product.stock) {
                          setQuantity(quantity + 1);
                        } else {
                          alert(`Only ${product.stock} unit(s) are available.`);
                        }
                      }}
                      className="px-4 py-2 text-sm font-medium text-black bg-transparent  border-gray-900 rounded-full "
                    >
                      <svg
                        className=" text-black "
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 12h14m-7 7V5"
                        />
                      </svg>
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleAddtoCart(product)}
                    disabled={isaddedToCart(product._id)}
                    className="text-white w-[100%]  bg-black  focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-base px-1 py-3  dark:bg-gray-800  dark:focus:ring-gray-700 dark:border-gray-700"
                  >
                    {isaddedToCart(product._id)
                      ? "already added to cart"
                      : "Add to Cart"}
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white py-5">
            <div className="w-full max-w-7xl mx-auto py-10 px-2 relative">
              <div className="w-full bg-white dark:bg-gray-800 dark:border-gray-700">
                {/* Tab Buttons */}
                <ul
                  className="flex justify-around font-medium text-center text-gray-600 border-b border-gray-200 rounded-t-lg bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800"
                  role="tablist"
                >
                  <li className="me-2">
                    <button
                      type="button"
                      onClick={() => setActiveTab("about")}
                      className={`inline-block p-4 ${
                        activeTab === "about"
                          ? "text-black"
                          : "text-gray-400 hover:text-gray-600"
                      } rounded-ss-lg hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700`}
                    >
                      Product Details
                    </button>
                  </li>
                  <li className="me-2">
                    <button
                      type="button"
                      onClick={() => setActiveTab("services")}
                      className={`inline-block p-4 ${
                        activeTab === "services"
                          ? "text-black"
                          : "text-gray-400 hover:text-gray-600"
                      } hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-300`}
                    >
                      Rating & Reviews
                    </button>
                  </li>
                  <li className="me-2">
                    <button
                      type="button"
                      onClick={() => setActiveTab("statistics")}
                      className={`inline-block p-4 ${
                        activeTab === "statistics"
                          ? "text-black"
                          : "text-gray-400 hover:text-gray-600"
                      } hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-300`}
                    >
                      FAQs
                    </button>
                  </li>
                </ul>

                {/* Tab Content */}
                <div id="defaultTabContent">
                  {activeTab === "about" && (
                    <div
                      id="about"
                      className="p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800"
                    >
                      {/* <h2 className="text-3xl font-bold">Product Details</h2>
                <p>Here is the product detail content.</p> */}
                    </div>
                  )}
                  {activeTab === "services" && (
                    <div
                      id="services"
                      className="p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800"
                    >
                      {/* <!-- List --> */}

                      <div className="flex justify-between  my-8">
                        <div className="col ">
                          <h2 className="text-3xl text-black font-bold  ">
                            All Reviews({product.review.length})
                          </h2>
                        </div>
                        <div className="flex ">
                          <span className=" w-11 h-11 rounded-full me-1 flex items-center justify-center bg-secondary">
                            <svg
                              className="w-6 h-6 text-gray-800 dark:text-white"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M5 13.17a3.001 3.001 0 0 0 0 5.66V20a1 1 0 1 0 2 0v-1.17a3.001 3.001 0 0 0 0-5.66V4a1 1 0 0 0-2 0v9.17ZM11 20v-9.17a3.001 3.001 0 0 1 0-5.66V4a1 1 0 1 1 2 0v1.17a3.001 3.001 0 0 1 0 5.66V20a1 1 0 1 1-2 0Zm6-1.17V20a1 1 0 1 0 2 0v-1.17a3.001 3.001 0 0 0 0-5.66V4a1 1 0 1 0-2 0v9.17a3.001 3.001 0 0 0 0 5.66Z" />
                            </svg>
                          </span>
                          <button
                            id="dropdownHoverButton"
                            data-dropdown-toggle="dropdownHover"
                            data-dropdown-trigger="hover"
                            className="text-black bg-secondary  h-11 hidden focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm mx-1 px-5 py-2.5 text-center md:inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            type="button"
                          >
                            Latest
                            <svg
                              className="w-2.5 h-2.5 ms-3"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 10 6"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 1 4 4 4-4"
                              />
                            </svg>
                          </button>
                          {/* <!-- Dropdown menu --> */}
                          <div
                            id="dropdownHover"
                            className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                          >
                            <ul
                              className="py-2 text-sm text-gray-700 dark:text-gray-200"
                              aria-labelledby="dropdownHoverButton"
                            >
                              <li>
                                <a
                                  href="#"
                                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                  Dashboard
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                  Settings
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                  Earnings
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                  Sign out
                                </a>
                              </li>
                            </ul>
                          </div>

                          <Link
                            href={`/reviews/${product._id}`}
                            className="text-white w-auto mx-1 bg-black hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-3 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                          >
                            Write Review
                          </Link>
                        </div>
                      </div>

                      {testimonials.length === 0 ? (
                        <p className="px-10 text-gray-500 my-20">
                          No testimonials available yet.
                        </p>
                      ) : (
                        <div className="flex flex-wrap   gap-4">
                    

                          {!product?.review?.length  && (
                            <>
                              <p className="text-gray-700 text-lg text-center ">
                                No customer reviews have been added yet. Order
                                now and be the first to share your experience!
                              </p>
                            </>
                          )}

                          {product.review.map((testimonial, index) => (
                            <div
                              key={index}
                              className="bg-white p-6 rounded-lg shadow-lg flex flex-col min-h-max min-w-72 max-w-min border"
                            >
                              <div className="flex text-yellow-500 text-lg mb-4">
                                <Star star={testimonial.rating} />
                              </div>
                              <div className="flex items-center mb-2">
                                <h3 className="text-lg font-bold text-black">
                                  {testimonial.user.name}
                                </h3>
                                {/* {testimonial.verified && ( */}
                       <span className="ml-2 bg-green-500 text-xs rounded-full px-1">
                           ✔
                       </span>
                       {/* )} */}
                              </div>
                              <p className="text-gray-600 text-sm">
                                {testimonial.comment}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="flex justify-center">
                        <button className="border bg-white text-black hover:bg-black hover:text-white rounded-full w-56 h-12 mt-8">
                          Load More Reviews
                        </button>
                      </div>
                    </div>
                  )}
                  {activeTab === "statistics" && (
                    <div
                      id="statistics"
                      className="p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800"
                    >
                      <dl className="flex justify-between">
                        <div className="flex flex-col ">
                          <dt className="mb-2 text-3xl font-extrabold">73M+</dt>
                          <dd className="text-gray-500 dark:text-gray-400">
                            Developers
                          </dd>
                        </div>
                        <div className="flex flex-col">
                          <dt className="mb-2 text-3xl font-extrabold">
                            100M+
                          </dt>
                          <dd className="text-gray-500 dark:text-gray-400">
                            Public repositories
                          </dd>
                        </div>
                        <div className="flex flex-col">
                          <dt className="mb-2 text-3xl font-extrabold">
                            1000s
                          </dt>
                          <dd className="text-gray-500 dark:text-gray-400">
                            Open source projects
                          </dd>
                        </div>
                      </dl>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white py-5 pb-10 px-14">
            <h1 className="text-5xl font-bold text-black text-center">
              YOU MIGHT ALSO LIKE
            </h1>

            <div className="flex flex-wrap justify-center gap-6 py-14">
              {TopSellings.map((product, index) => (
                <ProductCard key={index} product={product} />
              ))}
            </div>
          </section>
        </>
      )}
    </>
  );
}
