import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "@/Redux/Slices/User/userSlice"

export const store = configureStore({
    reducer: {
      User:UserSlice
    },
  });
  
  // Infer RootState and AppDispatch types from the store
  export type RootState = ReturnType<typeof store.getState>;
  export type AppDispatch = typeof store.dispatch;
  
  export default store;