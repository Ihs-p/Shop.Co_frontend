"use client";
import {  fetchAllOrders } from "@/redux/slices/orderSlice";
import { AppDispatch, RootState } from "@/redux/store";
import {  OrderState } from "@/redux/types";
import { loadStripe } from "@stripe/stripe-js";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, Toaster } from "sonner";

export default function OrderHistory() {
  const dispatch = useDispatch<AppDispatch>();

  

  const {  error, orders }: OrderState =
    useSelector((state: RootState) => state.order) || [];


  const convertdate = (date: string) => {
    // Convert to a Date object
    const dateObject = new Date(date);

    // Format to a readable date and time
    const readableDateTime = dateObject.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true, // Use 12-hour format; set to false for 24-hour format
    }); // Example: December 31, 2024, 11:59:59 PM

    return readableDateTime;
  };

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, []);

  useEffect(() => {
    if (error) {
      toast.warning("token expired,please login");
      redirect("/login");
    }
  }, [error]);


  // const handlepaynow = async (sessionId: string) => {

  //   const stripe = await loadStripe('pk_test_51QdRErRqQOeFdBt4VePnOISkbsH8R7eYhAvEGs6TLIzwtWCoJeStDv7mLSpNGp9Vplqhc5GZ55VndYCcv03AqzDZ00iut34SZw');
    

  
  //   if(sessionId)
  //   {
  
  //     stripe?.redirectToCheckout({
  //       sessionId:sessionId
  //     })

  //   }
  //   }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Toaster/>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Order History</h1>
        <div className="space-y-6">
          {
            orders?.length === 0 ? ( <span>your orders are empty </span> ) : 

         orders?.map((order) => (
            <div
              key={order._id}
              className="relative bg-white shadow-md rounded-lg p-6"
            >
              {/* Order Details */}
              <div className="border-b pb-4">
                <div className="flex justify-between">
                  <h2 className="text-lg font-semibold text-gray-700">
                    Order ID: {order._id}
                  </h2>
               <div>
               <p className="text-lg font-semibold text-gray-800">
                    Total: ${order.total}
                  </p>
                  
                    {order.paymentStatus == 'paid'?(
                      <p className="text-sm text-right">paid<span className="ml-2 bg-green-400 text-sm rounded-full  "> ✔ </span></p>
                    ):
                   (
                    <>
                    <p className="text-sm text-right"> unpaid</p>   
                     {/* <p className="underline text-sm cursor-pointer text-gray-500 text-right hover:text-gray-900" 
                     onClick={()=>handlepaynow(order.sessionId)}>pay now</p> */}

                    </>
                    
                   )
                    
                    
                    



                  }
                 
                  </div>
                   {/* <p className="text-sm">payment:{order.paymentStatus == 'paid'?'paid' <span className="ml-2 bg-green-500 text-xs rounded-full px-1">
                  //    ✔
                  //       </span>: 'not paid'}</p> */}
                </div>
                <p className="text-sm text-gray-500">
                  Date: {convertdate(order.date)}
                </p>
              </div>
              {/* Items List */}
              <div className="mt-4">
                <h4 className="text-md font-semibold text-gray-700 mb-2">
                  Items:
                </h4>
                <ul className="space-y-2">
                  {order.products.map((item, index) => (
                    <li
                      key={index}
                      className="flex justify-between text-gray-600"
                    >
                      <span>
                        {item.product.name} (x{item.quantity})
                      </span>
                      <span>${item.product.price * item.quantity}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Status at the Bottom */}
              <div className="mt-4 py-2 px-4 text-center rounded-xl">
                <span
                  className={`text-lg font-semibold py-1 px-2 rounded-xl ${
                    order.status === "Delivered"
                      ? "bg-green-100 text-green-600"
                      : order.status === "pending"
                      ? "bg-yellow-100 text-yellow-400"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
