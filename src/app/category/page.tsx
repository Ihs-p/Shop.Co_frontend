"use client";
import Filter from "@/components/Filter";
import { useEffect, useState } from "react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";

import {
  ChevronDownIcon,
 
} from "@heroicons/react/20/solid";

import ProductCard from "@/components/ProductCard";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch } from "react-redux";
import { fetchAllProducts } from "@/redux/slices/productSlice";
import { Product } from "@/redux/types";
import Loading from "@/components/Loading";
import {  useSearchParams } from "next/navigation";

const sortOptions = [
   "Most Popular",
   "Best Rating",
   "Newest",
   "Price: Low to High",
   "Price: High to Low",
];






// const Products: Product[] = [
//   {
//     name: "Polo with Contrast Trims",
//     price: 242,
//     image: "/images/product/pdetail1.png",
//     rating: 4.0,
//     discount: {
//       discount: 20,
//       discountPrice: 212,
//     },
//   },
//   {
//     name: "Gradient Graphic T-shirt",
//     price: 145,
//     image: "/images/product/pdetail2.png",
//     rating: 3.5,
//   },
//   {
//     name: "Polo with Tipping Details",
//     price: 180,
//     image: "/images/product/pdetail3.png",
//     rating: 4.5,
//   },
//   {
//     name: "Black Striped T-shirt",
//     price: 150,
//     image: "/images/product/pdetail4.png",
//     rating: 5.0,
//     discount: {
//       discount: 30,
//       discountPrice: 120,
//     },
//   },
// ];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Page() {

  const dispatch = useDispatch<AppDispatch>();
  const params = useSearchParams();
  
  const { products, totalPages, totalProducts, currentPage, inProgressFetchAll } = useSelector(
    (state: RootState) => state.products
  );
  
  const limit = 9;
  
  // State Management
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  // const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]); // Example range
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedStyle, setSelectedStyle] = useState<string>('');
  const [ setApplyFilter] = useState<boolean>(false);
  const [selectedSort, setSelectedSort] = useState<string>('Most Popular');
  const [startProduct, setStartProduct] = useState<number>(1);
  const [endProduct, setEndProduct] = useState<number>(9);
  const [totalItems, setTotalItems] = useState<number>(totalProducts);
  
  const loading = inProgressFetchAll;
  
  // Initial Fetch
  useEffect(() => {
    dispatch(fetchAllProducts({ page: 1, limit }));
  }, [dispatch]);
  
  // Handle Page Change
  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      dispatch(fetchAllProducts({ page, limit }));
    }
  };
  
  // Filtering, Sorting, and Pagination Logic
  useEffect(() => {
    const search: string | null = params.get('search');
  
    const applyFilters = () => {
      // Filter products based on criteria
      const filtered = products.filter((product) => {
        return (
          (!selectedCategory ||
            product.category.name.toLowerCase().includes(selectedCategory.toLowerCase())) &&
          product.price >= priceRange[0] &&
          product.price <= priceRange[1] &&
          (!selectedStyle || product.style.name === selectedStyle) &&
          (!selectedColor || product.colors.some((item) => item.name === selectedColor)) &&
          (!selectedSize || product.size.some((item) => item === selectedSize)) &&
          (!search || product.name.toLowerCase().includes(search.toLowerCase()))
        );
      });
  
      // Sort products
      const sorted = [...filtered];
      if (selectedSort === 'Best Rating') {
        sorted.sort((a, b) => b.rating - a.rating);
      } else if (selectedSort === 'Price: Low to High') {
        sorted.sort((a, b) => a.price - b.price);
      } else if (selectedSort === 'Price: High to Low') {
        sorted.sort((a, b) => b.price - a.price);
      }
  
      // Update total items
      setTotalItems(sorted.length);
  
      // Paginate
      const startIndex = (currentPage - 1) * limit;
      const endIndex = Math.min(startIndex + limit, sorted.length);
  
      setStartProduct(startIndex + 1);
      setEndProduct(endIndex);
  
      // Set filtered products for the current page
      setFilteredProducts(sorted.slice(startIndex, endIndex));
    };
  
    applyFilters();
  }, [
    products,
    params,
    selectedSort,
    selectedCategory,
    selectedStyle,
    selectedColor,
    selectedSize,
    priceRange,
    currentPage,
    limit,
  ]);
  


  return (
    <div className="bg-white px-4">
      <nav
        className="flex  py-3 lg:px-32 text-gray-700  bg-gray-50 "
        aria-label="Breadcrumb" 
      >
        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
          <li className="inline-flex items-center">
            <a
              href="#"
              className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-black dark:text-gray-400 dark:hover:text-white"
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
              {
                selectedStyle || selectedCategory  &&
                <a
                href="#"
                className="ms-1 text-sm font-medium text-gray-700 hover:text-black md:ms-2 dark:text-gray-400 dark:hover:text-white"
              >
                {selectedStyle || selectedCategory }
              </a> 
              } 
          
             
            </div>
          </li>
        </ol>
      </nav>
      <div>
        {/* Mobile filter dialog */}
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* <!-- drawer component --> */}
          <div
            id="drawer-right-example"
            className="block lg:hidden fixed top-28 rounded-t-xl right-0 z-40 h-screen p-4 overflow-y-auto transition-transform translate-x-full bg-white w-screen dark:bg-gray-800"
            tabIndex={-1}
            aria-labelledby="drawer-right-label"
          >
            <button
              type="button"
              data-drawer-hide="drawer-right-example"
              aria-controls="drawer-right-example"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close menu</span>
            </button>

            <div className="grid grid-cols-1  h-auto">
              <Filter
               setSelectedCategory={setSelectedCategory}
               selectedCategory =  {selectedCategory}
               setPriceRange =  {setPriceRange}
               setSelectedStyle =  {setSelectedStyle}
               selectedStyle =  {selectedStyle}
               setSelectedColor =  {setSelectedColor}
               selectedColor =  {selectedColor}
               setSelectedSize =  {setSelectedSize}
               selectedSize =  {selectedSize}
               setApplyFilter =  {setApplyFilter}
              
              />
            </div>
          </div>
         {/* <!-- End drawer component --> */}
          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <div className="hidden lg:block">
              <Filter
               setSelectedCategory={setSelectedCategory}
               selectedCategory =  {selectedCategory}
               setPriceRange =  {setPriceRange}
               setSelectedStyle =  {setSelectedStyle}
               selectedStyle =  {selectedStyle}
               setSelectedColor =  {setSelectedColor}
               selectedColor =  {selectedColor}
               setSelectedSize =  {setSelectedSize}
               selectedSize =  {selectedSize}
               setApplyFilter =  {setApplyFilter}

              
              /> 
                           </div>
              {/* Product grid */}
              <div className="lg:col-span-3">
                <div className="flex justify-between">
                  <div className="flex ">
                    <h1 className="text-black text-2xl font-bold text-center ">
                      {   selectedStyle || selectedCategory || "products"}
                    </h1>
                    <p className="text-gray-500 text-sm mt-2 ms-5 lg:hidden">
                      Showing {startProduct}-{endProduct} of {totalItems} Products
                    </p>
                  </div>
                  {/* <!-- drawer init and toggle --> */}
                  <div className="text-center lg:hidden">
                    <button
                      className="  hover:bg-slate-500 focus:ring-4 focus:ring-blue-300  text-sm rounded-lg dark:bg-white dark:hover:bg-gray-300 focus:outline-none dark:focus:ring-white"
                      type="button"
                      data-drawer-target="drawer-right-example"
                      data-drawer-show="drawer-right-example"
                      data-drawer-placement="right"
                      aria-controls="drawer-right-example"
                    >
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
                    </button>
                  </div>

                  <Menu
                    as="div" 
                    className="relative hidden lg:inline-block text-left"
                  >
                    <div className="flex items-center gap-5">
                        <p className="hidden text-sm lg:block text-gray-500">
                          Showing {startProduct}-{endProduct} of {totalItems} Products{" "}
                        </p>
                      <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-500 ">
                          <span className="ms-1 "> Sort by: </span>
                        <span className="text-black">{selectedSort}</span>
                        <ChevronDownIcon
                          aria-hidden="true"
                          className="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500"
                        />
                      </MenuButton>
                    </div>

                    <MenuItems
                      transition
                      className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                    >
                      <div className="py-1">
                        {sortOptions.map((option) => (
                          <MenuItem key={option}>
                            <span
                              onClick={()=> setSelectedSort(option)}
                              className={classNames(
                                option === selectedSort
                                  ? "font-medium text-gray-900"
                                  : "text-gray-500",
                                "block px-4 py-2 text-sm data-[focus]:bg-gray-100 data-[focus]:outline-none cursor-pointer"
                              )}
                            >
                              {option}
                            </span>
                          </MenuItem>
                        ))}
                      </div>
                    </MenuItems>
                  </Menu>

                </div>
                <div className="flex flex-wrap justify-start gap-2 py-3">
                  {
                    loading && <Loading/>
                  }
                 
                  { filteredProducts.map((product, index) => (
                    <ProductCard
                      key={index}
                      product={product}
                      
                    />
                  ))}
                </div>
                <hr/>


            <div className="flex py-3 justify-between">
            {/* <!-- Previous Button --> */}
            <button
    onClick={() => handlePageChange(currentPage - 1)}
    disabled={currentPage === 1}
    className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
  >
    <svg
      className="w-3.5 h-3.5 me-2 rtl:rotate-180"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 14 10"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M13 5H1m0 0 4 4M1 5l4-4"
      />
    </svg>
    <span className="hidden md:block">Previous</span>
  </button>

            <nav aria-label="Page navigation example">
            <ul className="flex items-center  h-8 text-sm">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
        <li key={page}>
          <button
            onClick={() => handlePageChange(page)}
            aria-current={currentPage === page ? "page" : undefined}
            className={`flex items-center justify-center px-3 h-8 leading-tight rounded-full ${
              currentPage === page
                ? "bg-black text-white dark:bg-blue-600 "
                : "text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            }`}
          >
            {page}
          </button>
        </li>
      ))}
              {/* <li>
                <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
              </li>
              <li>
                <a href="#" aria-current="page" className="z-10 flex items-center justify-center px-3 h-8 leading-tight text-blue-600   bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">...</a>
              </li>
              <li>
                <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white  hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">4</a>
              </li>
              <li>
                <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white  hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">5</a>
              </li>
              <li>
                <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white  hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">6</a>
              </li>
              <li>
                <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white  hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">7</a>
              </li>
              <li>
                <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white  hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">8</a>
              </li>
              <li>
                <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white  hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">9</a>
              </li>
              <li>
                <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white  hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">10</a>
              </li> */}
          
            </ul>
          </nav>





          <button
    onClick={() => handlePageChange(currentPage + 1)}
    disabled={currentPage === totalPages}
    className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
  >
    <span className="hidden md:block">Next</span>
    <svg
      className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 14 10"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M1 5h12m0 0L9 1m4 4L9 9"
      />
    </svg>
  </button>
          </div>




              </div>
            </div>

 
          </section>
        
        </main>
          
       </div>
    </div>
  );
}
