import api from "@/utils/api";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {  SignupFormData, UserInfo, UserState } from "../types";
import Cookies from 'js-cookie';







const initialState: UserState = {
    inprogressSignup: false,
    inprogressLogin:false,
    inprogressGoogle:false,
    user: null,
    token:null,
    signUperror:   null,
    Loginerror: null,
    googleError: null,
};





export const signup = createAsyncThunk<
  UserInfo,  // Return type
  SignupFormData,  // Argument type
  { rejectValue: string }  // Reject value type
>(
  'user/signup',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post(`/auth/signup`, userData, {
        headers: {
          'Content-type': 'application/json',
        },
      });
     
      return response.data; //  contains token and message
    } catch (error: unknown) {
      console.log(error)

      return rejectWithValue(
         'Signup failed'
      );
    }
  }
);


export const login = createAsyncThunk<
  UserInfo,  // Return type
  SignupFormData,  // Argument type
  { rejectValue: string }  // Reject value type
>(
  'user/login',
  async (userData, {  }) => {
   
      const response = await api.post(`/auth/login`, userData, {
        headers: {
          'Content-type': 'application/json',
        },
      });
      
      
      return response.data; //  contains token and message and user
  
  }
);


export const googleLogin = createAsyncThunk<
  UserInfo,  // Return type
  string,  // Argument type
  { rejectValue: string }  // Reject value type
>(
  'user/googleLogin',
  async (code, {  }) => {
   
      const response = await api.get(`/auth/google?code=${code}`);

      
      
      return response.data; //  contains token and message and user
  
  }
);





export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
      logout: (state) => {
        state.token = null;
        state.user = null;
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        Cookies.remove('token')
        window.location.reload()
        },

    },
    extraReducers: (builder) => {
        // signup
        builder.addCase(signup.pending, (state) => {
            state.inprogressSignup = true;
            state.signUperror = null;
            state.user = null
            state.token = null

        });

        builder.addCase(signup.fulfilled, (state, action:PayloadAction<{ token: string; user: { name: string; email: string } }>) => {
            state.inprogressSignup = false;
            state.user = action.payload.user ;
            state.token = action.payload.token;
            state.signUperror = null;
            localStorage.setItem('token',action.payload.token)
            localStorage.setItem('user',JSON.stringify(action.payload.user))
            Cookies.set('token', action.payload.token, { expires: 1 / 24 }); // 1 hour expiration

        });

        builder.addCase(signup.rejected, (state, action) => {
            state.inprogressSignup = false;
            state.signUperror = action.payload as string ;
            console.log("dfdfdfdfdfdfdf",action.payload as string);
            
        });


         // login
         builder.addCase(login.pending, (state) => {
            state.inprogressLogin = true;
            state.Loginerror = null;
            state.user = null
            state.token = null

        });

        builder.addCase(login.fulfilled, (state, action:PayloadAction<{ token: string; user: { name: string; email: string } }>) => {
            state.inprogressLogin = false;
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.Loginerror = null;
            localStorage.setItem('token',action.payload.token)
            localStorage.setItem('user',JSON.stringify(action.payload.user))
            Cookies.set('token', action.payload.token, { expires: 1 / 24 }); // 1 hour expiration

        });

        builder.addCase(login.rejected, (state, action) => {
            state.inprogressLogin = false;
            state.Loginerror = action.payload as string ;
            console.log("dfdfdfdfdfdfdf",action.error );
            if(action.error.message == "Request failed with status code 400")
            {
                state.Loginerror = "Invalid credientials"
            }else if(action.error.message == "Request failed with status code 500"){
                state.Loginerror = "something went wrong"
            }
            else{
                state.Loginerror = action?.error?.message as string
              }
            
        });





        // google
        builder.addCase(googleLogin.pending, (state) => {
          state.inprogressGoogle = true;
          state.googleError = null;
          state.user = null
          state.token = null

      });

      builder.addCase(googleLogin.fulfilled, (state, action:PayloadAction<{ token: string; user: { name: string; email: string } }>) => {
          state.inprogressGoogle = false;
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.googleError = null;
          localStorage.setItem('token',action.payload.token)
          localStorage.setItem('user',JSON.stringify(action.payload.user))
          Cookies.set('token', action.payload.token, { expires: 1 / 24 }); // 1 hour expiration

      });

      builder.addCase(googleLogin.rejected, (state, action) => {
          state.inprogressGoogle = false;
          state.googleError = action.payload as string ;
          console.log("dfdfdfdfdfdfdf",action.error );
          if(action.error.message == "Request failed with status code 400")
          {
              state.Loginerror = "Invalid credientials"
          }else if(action.error.message == "Request failed with status code 500"){
              state.googleError = "something went wrong"
          }
          else{
              state.googleError = action?.error?.message as string
            }
          
      });



       
    },
});
;
  



export const { logout } = userSlice.actions

export default userSlice.reducer
