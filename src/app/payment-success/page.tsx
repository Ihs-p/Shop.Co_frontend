"use client"
import { verifyPaymentStatus } from "@/redux/slices/orderSlice";
import { AppDispatch } from "@/redux/store";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";

export default function PaymentSuccess() {
  const dispatch  = useDispatch<AppDispatch>()
const params = useSearchParams()
const sessionId = params.get('session_id');
if(sessionId)
  dispatch(verifyPaymentStatus(sessionId))
    return (
      <div className="min-h-screen flex flex-col bg-gray-100">
      
        <main className="flex-grow flex flex-col justify-center items-center text-center">
          <div className="bg-white p-8 rounded shadow-md">
            <div className="text-green-500 text-5xl mb-4">✔</div>
            <h2 className="text-2xl font-bold text-black mb-2">Payment Successful!</h2>
            <p className="text-gray-600 mb-6">
              Thank you for your purchase. Your order has been successfully placed.
            </p>
            <Link
              href="/orders"
              className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
            >
              go orders
            </Link>
          </div>
        </main>
      
      </div>
    );
  }
  