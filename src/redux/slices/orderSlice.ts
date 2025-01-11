import api from "@/utils/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {  OrderData, Orders, OrderState } from "../types";
import Cookies from 'js-cookie';
import axios from "axios";

const initialState: OrderState = {
  orders: null,
  order: null,
  checkoutsessionId:"",
  inprogressCreateCheckoutSesssion: false,
  inprogressPlacingOrder: false,
  inprogressFetchAllOrders: false,
  error: "",
  cartFinalTotal :0
};





export const createCheckoutSesssion = createAsyncThunk<
  {id:string}, // The type of the returned response
 {total:number}, // The type of the input argument
 
  {
    rejectValue: string; // Optional type for rejected payload
  }
>("order/createCheckoutSesssion", async ({total}, thunkApi) => {
  try {
   const token  = await Cookies.get('token')
    const response = await api.post(`/orders/create-checkout-session`, {total}, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,

      },
      // body:JSON.stringify({total})
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      // Check if error is an AxiosError
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Failed to add order"
      );
    }
  }
});




export const verifyPaymentStatus = createAsyncThunk("order/verifyPaymentStatus", async (sessionId:string, thunkApi) => {
  try {
   const token  =  Cookies.get('token')
  const response = await api.get(`/orders/payment-status/${sessionId}`, {
    headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,

      },
      
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {

    return thunkApi.rejectWithValue(
      error.response?.data?.message || "Failed payment"
    );
  }}
});






export const addOrder = createAsyncThunk<
  Orders, // The type of the returned response
  OrderData, // The type of the input argument
  {
    rejectValue: string; // Optional type for rejected payload
  }
>("order/addOrder", async (orderdata, thunkApi) => {
  try {
   const token  = await Cookies.get('token')

    const response = await api.post(`/orders`, orderdata, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,

      },
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {

    return thunkApi.rejectWithValue(
      error.response?.data?.message || "Failed to add order"
    );
  }}
});

export const fetchAllOrders = createAsyncThunk(
  "orders/fetchAllOrders",
  async (_, thunkAPI) => {
    try {
      // Retrieve the token from localStorage
      const token = localStorage.getItem("token");
     

      // Make the API call with the token in the Authorization header
      const response = await api.get("/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data; // Return the data to be added to the store
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {

      // Handle errors and return a rejected action with a message
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch data"
      );
    }}
  }
);

export const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addfinaltotal  : (state, action) => {
      state.cartFinalTotal = action.payload;
  },
},
  extraReducers: (builder) => {

    builder.addCase(createCheckoutSesssion.pending, (state) => {
      state.inprogressCreateCheckoutSesssion = true;
      state.error = null;
    });

    builder.addCase(createCheckoutSesssion.fulfilled, (state,action) => {
      state.inprogressCreateCheckoutSesssion = false;
      state.checkoutsessionId = action.payload.id
      state.error = null;
    });

    builder.addCase(createCheckoutSesssion.rejected, (state, action) => {
      state.inprogressCreateCheckoutSesssion = false;
      state.error = action.payload as string;
    });



    builder.addCase(addOrder.pending, (state) => {
      state.inprogressPlacingOrder = true;
      state.error = null;
    });

    builder.addCase(addOrder.fulfilled, (state) => {
      state.inprogressPlacingOrder = false;
      state.error = null;
    });

    builder.addCase(addOrder.rejected, (state, action) => {
      state.inprogressPlacingOrder = false;
      state.error = action.payload as string;
    });





    builder.addCase(fetchAllOrders.pending, (state) => {
      state.inprogressFetchAllOrders = true;
      state.error = null;

    });

    builder.addCase(fetchAllOrders.fulfilled, (state,action) => {
      state.inprogressFetchAllOrders = false;
      state.orders = action.payload
      state.error = null;

    });

    builder.addCase(fetchAllOrders.rejected, (state, action) => {
      state.inprogressFetchAllOrders = false;
      state.error = action.payload as string;
    });
  },
});

export default orderSlice.reducer;
export const { addfinaltotal } = orderSlice.actions;