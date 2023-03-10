import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    inbox:[],
    isRead:true
}

const inboxslice = createSlice({
    name:'inbox',
    initialState:initialState,
    reducers:{
        setinbox(state,action){
            state.inbox = action.payload
        },
        setisread(state,action){
            state.isRead = action.payload
         }
    }


})

export const inboxAction = inboxslice.actions

export default inboxslice