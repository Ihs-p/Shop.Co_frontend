"use client"
import { clearCart } from "@/redux/slices/cartSlice";
import { addOrder, createCheckoutSesssion } from "@/redux/slices/orderSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { Carts, OrderState, UserInfo } from "@/redux/types";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form"
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {loadStripe} from '@stripe/stripe-js';
import { toast, Toaster } from "sonner";


interface FormData {
  name: string;
  email: string;
  country: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
}


export default function CheckoutPage() {

const dispatch = useDispatch<AppDispatch>()

  const carts:Carts = useSelector((state:RootState) => state.carts);
  const {checkoutsessionId} = useSelector((state:RootState) => state.order);
  const {cartFinalTotal}:OrderState = useSelector((state:RootState) => state.order);
  const {inprogressPlacingOrder : loading}:OrderState = useSelector((state:RootState) => state.order);
  const user:UserInfo['user'] = JSON.parse(localStorage.getItem('user') || "{}");


  
  const { register, handleSubmit } = useForm<FormData>()

 
  
  const onSubmit: SubmitHandler<FormData> = async(data) =>{
    
    const stripe = await loadStripe('pk_test_51QdRErRqQOeFdBt4VePnOISkbsH8R7eYhAvEGs6TLIzwtWCoJeStDv7mLSpNGp9Vplqhc5GZ55VndYCcv03AqzDZ00iut34SZw');
    

  const result = await dispatch(createCheckoutSesssion({total:cartFinalTotal}))

  if(( result.type == 'order/createCheckoutSesssion/fulfilled'))
  {

    stripe?.redirectToCheckout({
      sessionId:checkoutsessionId
    })



     const newOrder = {
    name: data.name,
    email: data.email,
    address:{
       country: data.country,
       city: data.city,
       state: data.state,
       zip: data.zip
    },
    phone: data.phone,
    products: carts.map((item) => {
      return {
        product: item._id,
        quantity: item.quantity,
        color: item.color,
        size: item.size,
      };
    }),
    sessionId:checkoutsessionId,
    total:cartFinalTotal
    }

   const result = await  dispatch(addOrder(newOrder))
   
   if(result.type == 'order/addOrder/fulfilled'){
    toast.success("order success")
    dispatch(clearCart())
   }
   

   }
  }





  useEffect(()=>{
     if(!cartFinalTotal)
      redirect('/carts')
  },[cartFinalTotal])
 

    return (
      <section className="px-2 md:px-32 flex flex-col items-center min-h-screen justify-center bg-gray-50">
        <Toaster/>
        <div className="w-full max-w-4xl border rounded-2xl px-6 py-8 bg-white shadow-lg">
          <h1 className="font-extrabold text-4xl text-center mb-6">CHECKOUT</h1>
          <form className="space-y-6"  onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label htmlFor="name" className="text-sm font-semibold text-gray-600 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your full name"
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
                  required
                  {...register("name", { required: true })}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="email" className="text-sm font-semibold text-gray-600 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
                  required
                  value={user.email}
                  readOnly
                  {...register("email", { required: true })}
                />
              </div>
            </div>
  
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label htmlFor="address" className="text-sm font-semibold text-gray-600 mb-2">
                  Country
                </label>
                <input
                  type="text"
                  id="address"
                  placeholder="Enter your country"
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
                  required
                  {...register("country")}
                />
              </div>
              <div className="flex flex-col">
               

                  <label htmlFor="state" className="text-sm font-semibold text-gray-600 mb-2">
                  State
                </label>
                <input
                  type="text"
                  id="state"
                  placeholder="Enter your state"
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
                  required
                  {...register("state", { required: true })}
                />
              </div>
            </div>
  
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col">
              <label htmlFor="city" className="text-sm font-semibold text-gray-600 mb-2">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  placeholder="Enter your city"
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
                  required
                  {...register("city")}

                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="zip" className="text-sm font-semibold text-gray-600 mb-2">
                  ZIP Code
                </label>
                <input
                  type="text"
                  id="zip"
                  placeholder="Enter your ZIP code"
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
                  required
                  {...register("zip", { required: true })}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="phone" className="text-sm font-semibold text-gray-600 mb-2">
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phone"
                  placeholder="Enter your phone number"
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
                  required
                  {...register("phone", { required: true })}
                />
              </div>
            </div>
  
            <button
              type="submit"
              className="w-full  bg-black text-white text-lg font-bold py-3 rounded-full hover:bg-gray-800 transition"
            >
              {loading ? "Placing Order..." : "Place Order "}
            </button>
          </form>
        </div>
      </section>
    );
  }
  