import api from "@/utils/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { FetchProductsParams, Product, ProductState } from "../types";
import Cookies from 'js-cookie';







const initialState: ProductState = {
    products: [],
    product: null,
    inProgressFetchAll: false,
    inProgressFetchSingle: false,
    error: "",
    totalPages: 0,
    currentPage: 1,
    totalProducts:0
};




interface Review {
  user: string; // User ID
  rating: number; // Rating given
  comment: string; // Review comment
}



export const fetchAllProducts = createAsyncThunk(
    'products/fetchAllProducts',
    async ({ page, limit, category,currentProductId }: FetchProductsParams, thunkApi) => {
      try {
        // Construct the query string
        const queryParams = new URLSearchParams({
          page: String(page),
          limit: String(limit),
          ...(category ? { category } : {}), // Add category if provided
          ...(currentProductId ? { currentProductId } : {}), // Add category if provided
        });
       console.log(category)
        // Make the API call
        const response: AxiosResponse<ProductState> = await api.get(`/products?${queryParams}`);
        console.log('Fetched paginated products');
        
        return response.data; // Backend should include metadata (e.g., totalPages, currentPage)
      } catch (error) {
        console.error('Error fetching products:', error);
        return thunkApi.rejectWithValue(error); // Handle errors
      }
    }
  );

export const fetchProduct = createAsyncThunk(
    'products/fetchProduct',
     async (id:string,) =>{ 
      
            const response: AxiosResponse<Product[]>  = await api.get(`/products/${id}`);
            console.log("fetched single product");
            
            return  await response.data as Product[]
            
        
     }
)


export const addReview = createAsyncThunk<
  Product, // The type of the response (updated product)
  { review: Review; id: string }, // Input argument types
  { rejectValue: string } // Optional rejection payload type
>(
  'products/addReview',
  async ({ review, id }, thunkApi) => {
    try {
      const token = Cookies.get('token');
      const response: AxiosResponse<Product> = await api.post(
        `/products/add-review/${id}`,
        review,
        {
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data; // Return the updated product
    } catch (error) {
      console.log(error)
      return thunkApi.rejectWithValue('Failed to add review');
    }
  }
);

export const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // fetchAllProducts
        // builder.addCase(fetchAllProducts.pending, (state) => {
        //     state.inProgressFetchAll = true;
        // });

        // builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
        //     state.inProgressFetchAll = false;
        //     state.products = action.payload ?? [];
        // });

        // builder.addCase(fetchAllProducts.rejected, (state, action) => {
        //     state.inProgressFetchAll = false;
        //     state.error = action.error;
        // });

        builder.addCase(fetchAllProducts.pending, (state) => {
            state.inProgressFetchAll = true;
            state.error = null;
          });
          builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
            state.inProgressFetchAll = false;
            state.products = action.payload.products;
            state.totalPages = action.payload.totalPages;
            state.currentPage = action.payload.currentPage;
            state.totalProducts = action.payload.totalProducts;
          });
          builder.addCase(fetchAllProducts.rejected, (state, action) => {
            state.inProgressFetchAll = false;
            state.error = action.payload as string;
          });

        // fetchProduct
        builder.addCase(fetchProduct.pending, (state) => {
            state.inProgressFetchSingle = true;
            state.product = null;
        });

        builder.addCase(fetchProduct.fulfilled, (state, action) => {
            state.inProgressFetchSingle = false;
            state.product = action.payload?.[0] ?? null;
        });

        builder.addCase(fetchProduct.rejected, (state, action) => {
            state.inProgressFetchSingle = false;
            state.error = action.error;
        });
    },
});
;
  



// export const { } = productSlice.actions

export default productSlice.reducer
