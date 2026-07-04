import { configureStore } from "@reduxjs/toolkit";
import AuthsliceReducer from './Slices/AuthSlice'
import DrugSliceReducer from "./Slices/DrugSlice";
import supplyChainReducer
from "./Slices/SupplyChainSlice";

export const store=configureStore({
    reducer:{
        auth:AuthsliceReducer,
        drug:DrugSliceReducer,
        supplychain:supplyChainReducer,

    },
    devTools:true

})