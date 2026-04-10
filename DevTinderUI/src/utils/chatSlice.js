/* eslint-disable no-unused-vars */

import { createSlice } from "@reduxjs/toolkit";

const chatSlice=createSlice({
    name:"chat",
    initialState:null,
    reducers:{
        addChats:(state,action)=>{
            return action.payload;
        },
        clearChats:(state,action)=>{
            return null;
        }
    }
});

export const {addChats, clearChats}= chatSlice.actions;
export default chatSlice.reducer;