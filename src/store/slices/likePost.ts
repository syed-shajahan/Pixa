import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IpropsData } from '../../utils/types/types';


interface LikePostState {
  likedPost: IpropsData[];
}

const initialState: LikePostState = {
  likedPost: [],
};

const likePostSlice = createSlice({
  name: 'likePosts',
  initialState,
  reducers: {

    handleLike(state, action: PayloadAction<IpropsData>) {

    
      const existingPost = state.likedPost.find(post => post.id === action.payload.id);

      if (existingPost) {
        state.likedPost = state.likedPost.filter(post => post.id !== action.payload.id);
      } else {
        state.likedPost.push(action.payload);
      }
       console.log('Updated likedPost State:', state.likedPost);
    },
  


   
  },
});

export const { handleLike } = likePostSlice.actions;

export default likePostSlice.reducer;
