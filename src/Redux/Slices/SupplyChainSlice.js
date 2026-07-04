import {
   createSlice,
   createAsyncThunk,
} from "@reduxjs/toolkit";

import axiosInstance
from "../../Helpers/axiosInstance";

/**
 * Fetch full supply chain data
 */
export const fetchSupplyChain =
createAsyncThunk(

   "supplychain/fetch",

   async (drugId, thunkAPI) => {

      try {

         const response =
            await axiosInstance.get(

               `/api/supply-chain/${drugId}`

            );

         return response.data.data;

      }

      catch(error){

         return thunkAPI.rejectWithValue(

            error.response?.data?.message
            || "Failed to fetch supply chain"

         );
      }
   }
);

const initialState = {

   loading: false,

   error: null,

   supplyChainData: null,
};

const supplyChainSlice =
createSlice({

   name: "supplychain",

   initialState,

   reducers: {

      clearSupplyChain:
      (state) => {

         state.supplyChainData = null;

         state.error = null;
      },
   },

   extraReducers: (builder) => {

      builder

      // pending
      .addCase(
         fetchSupplyChain.pending,

         (state) => {

            state.loading = true;

            state.error = null;
         }
      )

      // success
      .addCase(
         fetchSupplyChain.fulfilled,

         (state, action) => {

            state.loading = false;

            state.supplyChainData =
               action.payload;
         }
      )

      // failed
      .addCase(
         fetchSupplyChain.rejected,

         (state, action) => {

            state.loading = false;

            state.error =
               action.payload;
         }
      );
   },
});

export const {
   clearSupplyChain
} = supplyChainSlice.actions;

export default
supplyChainSlice.reducer;