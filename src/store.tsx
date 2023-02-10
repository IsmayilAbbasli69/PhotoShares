import { configureStore } from "@reduxjs/toolkit";
import { useDispatch,TypedUseSelectorHook, useSelector } from "react-redux";
import blogSlice from "./features/blogSlice";
import createPhotoSlice from "./features/createPhotoSlice";

const store=configureStore({
reducer:{
blog:blogSlice,
photo:createPhotoSlice
}
})
export default store;
export type RootState= ReturnType<typeof store.getState>;
export type AppDispatch=typeof store.dispatch;
export const useAppDispatch=()=>useDispatch<AppDispatch>();
export const useAppSelector:TypedUseSelectorHook<RootState>=useSelector;