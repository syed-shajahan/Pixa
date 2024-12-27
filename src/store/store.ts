import { configureStore } from '@reduxjs/toolkit';
import likePostReducer from './slices/likePost'; 

const store = configureStore({
  reducer: {
    likePosts: likePostReducer,
  },
  devTools: process.env.NODE_ENV !== 'production', 
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
