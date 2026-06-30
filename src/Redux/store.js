import { configureStore } from "@reduxjs/toolkit";
import AuthsliceReducer from './Slices/AuthSlice'
import DrugSliceReducer from "./Slices/DrugSlice";

export const store=configureStore({
    reducer:{
        auth:AuthsliceReducer,
        drug:DrugSliceReducer,

    },
    devTools:true

})