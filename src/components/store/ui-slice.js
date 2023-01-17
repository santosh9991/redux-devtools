import {createSlice} from '@reduxjs/toolkit';

const uiSlice = createSlice({
    name: "ui",
    initialState: {cartISVisible:false,notification:null},
    reducers:{
        toggle(state){
            state.cartISVisible = !state.cartISVisible;
        },
        showNotification(state,action){
            state.notification = {status:action.payload.status,
            title:action.payload.title,
        message: action.payload.message}
        }

    }
});

export const uiActions = uiSlice.actions;
export default uiSlice;