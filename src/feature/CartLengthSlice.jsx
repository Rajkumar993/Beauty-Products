import { createSlice } from "@reduxjs/toolkit";

const initialState={
  data:[]
}
const CartLengthSlice=createSlice({
name:"clength",
initialState,
reducers:{
  add(state,action){
 state.data.push(action.payload)
  }
}
})
export const {add}=CartLengthSlice.actions;
export default CartLengthSlice.reducer