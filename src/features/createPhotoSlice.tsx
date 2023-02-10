
import {createSlice,PayloadAction} from '@reduxjs/toolkit'
import React from 'react'


export interface IPhoto{
tags:string[],
file:any,
name:string,

}
const initialState:IPhoto={
    tags:['cute'],
    file:'https://picsum.photos/seed/picsum/200/300',
    name:' '
}
export const createPhotoSlice=createSlice({
name:'addPhoto',
initialState,
reducers:{
   createTags:(state,action)=>{
  state.tags=action.payload

} ,
createUrl:(state,action)=>{
state.file=action.payload

},
createName:(state,action)=>{
  state.name=action.payload
  
  }
}

})
export default createPhotoSlice.reducer
export const {createTags,createUrl,createName}=createPhotoSlice.actions