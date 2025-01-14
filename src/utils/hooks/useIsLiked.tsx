import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const useIsLiked = (id:any) => {
    const likedPost = useSelector((state:RootState)=> state.likePosts.likedPost);
   return likedPost.some((likedPost)=>likedPost.id === id );

}

export default useIsLiked;