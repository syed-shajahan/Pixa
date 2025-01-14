import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import { IconButton } from "@mui/material";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { FC } from "react";
import { useDispatch } from "react-redux";
import { handleLike } from "../store/slices/likePost";
import { IpropsData } from "../utils/types/types";
import FavoriteIcon from '@mui/icons-material/Favorite';
import useIsLiked from "../utils/hooks/useIsLiked";
import { Link } from "react-router-dom";

interface IpropsMainCard {
  item: IpropsData;
  index: number;
  handleClickOpen: (index: number) => void;
}

const MainCard: FC<IpropsMainCard> = ({ item, index, handleClickOpen }) => {
  const dispatch = useDispatch();

  const isLiked = useIsLiked(item.id);;

  

  return (
    <Card className="custom_card">
      <Box className="aspectImgs">
        <img
          className="aspectImages cursor_pointer"
          src={item.urls.regular}
          alt={item.alt_description}
          onClick={() => handleClickOpen(index)}
        />
        <Box className="profilePics">
          <img src={item.user.profile_image.medium} alt="" />
        </Box>

        <Link
          to={item.urls.full}
          className="img_downLoadBtn"
          download
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconButton title="Download Image"  >
            <FileDownloadOutlinedIcon />
          </IconButton>
        </Link>
        <IconButton className="like_btn" onClick={() => dispatch(handleLike(item))}>
        
          {isLiked ? <FavoriteIcon style={{ color: '#f5167f' }} /> : <FavoriteBorderIcon />}
        </IconButton>
      </Box>
    </Card>
  );
};

export default MainCard;
