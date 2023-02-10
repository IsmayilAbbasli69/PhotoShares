
import {createSlice,PayloadAction} from '@reduxjs/toolkit'


export interface IBlog{
tags:string[],
url:string

}
const initialState:IBlog[]=[]

export const blogSlice=createSlice({
name:'photo',
initialState,
reducers:{
   get:(state,action)=>{
const newPhoto={tags:action.payload,url:'https://picsum.photos/200/300'}
state.push(newPhoto)
} 
}

})
export default blogSlice.reducer
export const {get}=blogSlice.actions