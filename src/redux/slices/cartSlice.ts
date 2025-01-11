import {  createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cart, Carts } from '../types';
import { toast } from 'sonner';



// Helper function to save the cart to localStorage
const saveToLocalStorage = (carts: Carts) => {
  localStorage.setItem('carts', JSON.stringify(carts));
};

// Retrieve the initial state from localStorage or set it as an empty array
const initialState: Carts = JSON.parse(localStorage.getItem('carts') || '[]');


// export const addCartsToDB = createAsyncThunk<
// any,
// void,
  
// { state: RootState; rejectValue: string }  // Reject value type
// >(
//   'cart/addCart',
//   async (_,{getState}) => {

//     const state = getState();
//     const carts = state.carts
    
//     const user: UserInfo['user'] | null = (() => {
//       const storedUser = localStorage.getItem('user');
//       return storedUser ? JSON.parse(storedUser) : null;
//     })();   
//      console.log(user)
    
   
//       const response = await api.post(`/carts`,{carts,user} , {
//         headers: {
//           'Content-type': 'application/json',
//         },
      
//       });
      
//       return response.data; //  contains token and message and user
  
//   }
// );  


const cartSlice = createSlice({
  name: 'carts',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Cart>) => {
      // Check if the item already exists in the cart
      const existingItem = state.find((item) => item._id === action.payload._id);
      if (existingItem ) {
        existingItem.quantity = action.payload.quantity; // Update quantity if it exists
      } else {
        state.push(action.payload); // Add new item
      }
      saveToLocalStorage(state);
    },
    increaseQuantity: (
      state,
      action: PayloadAction<{ id: string; }>
    ) => {
      const { id } = action.payload;  
      const existingItem = state.find((item) => item._id == id);
      if (existingItem && existingItem.quantity < existingItem.stock) {
        existingItem.quantity += 1;
        toast.success('quantity updated');
      }else{
        toast.error("only "+existingItem?.stock+" unit is available");


      }
      saveToLocalStorage(state);
    },
    decreaseQuantity: (
      state,
      action: PayloadAction<{ id: string; }>
    ) => {
      const { id } = action.payload;
      const existingItem = state.find((item) => item._id === id);
      if (existingItem &&  existingItem?.quantity != 1 ) {
        toast.success('quantity updated');
        existingItem.quantity -= 1;
      }
      saveToLocalStorage(state);
    },
    deleteFromCart: (state, action: PayloadAction<string>) => {
      const updatedState = state.filter((item) => item._id !== action.payload);
      saveToLocalStorage(updatedState);
      toast.success("removed from cart");
      return updatedState; // Return the updated state
    },
    clearCart: () => {
      saveToLocalStorage([]); // Clear localStorage
      return []; // Clear state
    },
  
  },


});

export const { addToCart,increaseQuantity, decreaseQuantity, deleteFromCart, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
