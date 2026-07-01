import {
    createAsyncThunk,
    createSlice
} from "@reduxjs/toolkit";

import axiosInstance from "../../Helpers/axiosInstance";



// ─────────────────────────────────────────────
// INITIAL STATE
// ─────────────────────────────────────────────

const initialState = {

   drugs: [],

   loading: false,

   error: null,

   success: false,

   registeredDrug: null,

   verificationResult: null,

   verificationLoading: false,

   transferLoading: false,

   transferSuccess: false,

   transferError: null,
}



// ─────────────────────────────────────────────
// REGISTER DRUG THUNK
// ─────────────────────────────────────────────

export const registerDrug = createAsyncThunk(

    "drug/register",

    async (drugData, thunkAPI) => {

        try {

            // backend request
            const response =
                await axiosInstance.post(

                    "/api/drugs",

                    drugData
                );

            console.log(
                "Drug registration response:",
                response.data
            );

            return response.data;

        }
        catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data ||

                "Drug registration failed"
            );
        }
    }
);

export const getMyDrugs = createAsyncThunk(

   "drug/getmydrugs",

   async (_, thunkAPI) => {

      try {

         const response =
            await axiosInstance.get(
               "/api/drugs/mine"
            );

         console.log(
            "my drugs response:",
            response.data
         );

         return response.data;
      }

      catch(error){

         return thunkAPI.rejectWithValue(

            error.response?.data ||

            "Failed to fetch drugs"
         );
      }
   }
);
export const verifyDrug = createAsyncThunk(

   "drug/verify",

   async (drugId, thunkAPI) => {

      try {

         const response =
            await axiosInstance.get(
               `/api/drugs/${drugId}/verify`
            );

         console.log(
            "verification response:",
            response.data
         );

         return response.data;
      }

      catch(error){

         return thunkAPI.rejectWithValue(

            error.response?.data ||

            "Verification failed"
         );
      }
   }
);

export const transferDrugOwnership =
createAsyncThunk(

   "drug/transfer",

   async (transferData, thunkAPI) => {

      try {

         const response =
            await axiosInstance.post(

               "/api/scans/transfer",

               transferData
            );

         return response.data;

      }

      catch(error){

         return thunkAPI.rejectWithValue(

            error.response?.data?.message ||

            "Transfer failed"
         );
      }
   }
);



// ─────────────────────────────────────────────
// DRUG SLICE
// ─────────────────────────────────────────────

const DrugSlice = createSlice({

    name: "drug",

    initialState,



    reducers: {

        // reset state manually if needed
        clearDrugState: (state) => {

            state.loading = false;

            state.success = false;

            state.error = null;

            state.registeredDrug = null;
        }
    },



    extraReducers: (builder) => {

        builder



        // ─────────────────────────────
        // REGISTER DRUG PENDING
        // ─────────────────────────────

        .addCase(
            registerDrug.pending,

            (state) => {

                state.loading = true;

                state.success = false;

                state.error = null;
            }
        )



        // ─────────────────────────────
        // REGISTER DRUG SUCCESS
        // ─────────────────────────────

        .addCase(
            registerDrug.fulfilled,

            (state, action) => {

                state.loading = false;

                state.success = true;

                state.error = null;

                // backend returns:
                // { success:true, data: drug }

                state.registeredDrug =
                    action.payload.data;
            }
        )



        // ─────────────────────────────
        // REGISTER DRUG FAILED
        // ─────────────────────────────

        .addCase(
            registerDrug.rejected,

            (state, action) => {

                state.loading = false;

                state.success = false;

                state.error =
                    action.payload;
            }
        )

        .addCase(

            getMyDrugs.pending,

        (state) => {

            state.loading = true;

            state.error = null;
        }
        )



        .addCase(

        getMyDrugs.fulfilled,

        (state, action) => {

            state.loading = false;

            state.drugs =
                action.payload.data;
        }
        )



        .addCase(

        getMyDrugs.rejected,

        (state, action) => {

            state.loading = false;

            state.error =
                action.payload;
        }
        )

        .addCase(

        verifyDrug.pending,

        (state) => {

            state.verificationLoading = true;
        }
        )



        .addCase(

        verifyDrug.fulfilled,

        (state, action) => {

            state.verificationLoading = false;

            state.verificationResult =
                action.payload.data;
        }
        )



        .addCase(

        verifyDrug.rejected,

        (state) => {

            state.verificationLoading = false;
        }
        )


        .addCase(
        transferDrugOwnership.pending,

        (state) => {

            state.transferLoading = true;

            state.transferError = null;
        }
        )

        .addCase(
        transferDrugOwnership.fulfilled,

        (state) => {

            state.transferLoading = false;

            state.transferSuccess = true;
        }
        )

        .addCase(
        transferDrugOwnership.rejected,

        (state, action) => {

            state.transferLoading = false;

            state.transferError =
                action.payload;
        }
        )
    }
});



// ─────────────────────────────────────────────
// EXPORT ACTIONS
// ─────────────────────────────────────────────

export const {

    clearDrugState

} = DrugSlice.actions;



// ─────────────────────────────────────────────
// EXPORT REDUCER
// ─────────────────────────────────────────────

export default DrugSlice.reducer;