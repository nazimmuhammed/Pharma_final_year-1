import { configureStore } from "@reduxjs/toolkit";
import AuthsliceReducer from './Slices/AuthSlice'
import DrugSliceReducer from "./Slices/DrugSlice";
import supplyChainReducer
from "./Slices/SupplyChainSlice";
import aiReducer from "./Slices/aiSlice";

export const store=configureStore({
    reducer:{
        auth:AuthsliceReducer,
        drug:DrugSliceReducer,
        supplychain:supplyChainReducer,
        ai: aiReducer,

    },
    devTools:true

})