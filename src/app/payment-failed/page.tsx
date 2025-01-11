"use client"

import { verifyPaymentStatus } from "@/redux/slices/orderSlice";
import { AppDispatch } from "@/redux/store";
import { useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";

export default function PaymentFailed() {

  const dispatch  = useDispatch<AppDispatch>()
const params = useSearchParams()
const sessionId = params.get('session_id');

if(sessionId)
  dispatch(verifyPaymentStatus(sessionId ))

    return (
      <div className="min-h-screen flex flex-col bg-gray-100">
       
        <main className="flex-grow flex flex-col justify-center items-center text-center">
          <div className="bg-white p-8 rounded shadow-md">
            <div className="text-red-500 text-5xl mb-4">✖</div>
            <h2 className="text-2xl font-bold text-black mb-2">Payment cancelled!</h2>
            <p className="text-gray-600 mb-6">
              Oops! Something went wrong. Please try again.
            </p>
            <a
              href="/orders"
              className="px-4  py-2 bg-black rounded-full  text-white border hover:border-gray-600"
            >
              see orders 
            </a>
          
          </div>
        </main>
       
      </div>
    );
  }
  