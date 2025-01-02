import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import { IconButton } from "@mui/material";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleLike } from "../store/slices/likePost";
import { IpropsData } from "../utils/types/types";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { RootState } from "../store/store";

interface IpropsMainCard {
  item: IpropsData;
  index: number;
  handleClickOpen: (index: number) => void;
}

const MainCard: FC<IpropsMainCard> = ({ item, index, handleClickOpen }) => {

  const likedItems = useSelector((state: RootState) => state.likePosts.likedPost);
  const dispatch = useDispatch();
  const isLiked = likedItems.some((likedItem) => likedItem.id === item.id);

  return (
    <Card className="custom_card">
      <Box className="aspectImgs">
        <img
          className="aspectImages cursor_pointer"
          src={item.urls.regular}
          alt={item.alt_description}
          onClick={() => handleClickOpen(index)}
        />
        <span className="profilePics">
          <img src={item.user.profile_image.medium} alt="" />
        </span>

        <a
          href={item.urls.full}
          className="img_downLoadBtn"
          download
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconButton title="Download Image"  >
            <FileDownloadOutlinedIcon />
          </IconButton>
        </a>
        <IconButton className="like_btn" onClick={() => dispatch(handleLike(item))}>
        
          {isLiked ? <FavoriteIcon style={{ color: '#f5167f' }} /> : <FavoriteBorderIcon />}
        </IconButton>
      </Box>
    </Card>
  );
};

export default MainCard;
