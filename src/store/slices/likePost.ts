import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IpropsData } from '../../pages/Home';


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
    // Action to add a liked post
    handleLike(state, action: PayloadAction<IpropsData>) {
      const existingPost = state.likedPost.find(post => post.id === action.payload.id);
      if (!existingPost) {
        state.likedPost.push(action.payload);
      }
      else{
         state.likedPost = state.likedPost.filter(post => post.id === action.payload.id);
      }
    },
  
   
  },
});

export const { handleLike } = likePostSlice.actions;

export default likePostSlice.reducer;
