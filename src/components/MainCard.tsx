import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import { IconButton } from '@mui/material';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { FC } from 'react';
import { IpropsData } from '../pages/Home';

interface IpropsMainCard {
  item: IpropsData;
  index: number;
  handleClickOpen: (index: number) => void;
}

const MainCard: FC<IpropsMainCard> = ({
  item,
  index,
  handleClickOpen,
}) => {
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
          <IconButton title="Download Image">
            <FileDownloadOutlinedIcon />
          </IconButton>
        </a>
        <IconButton

          className="like_btn"

        >

          <FavoriteBorderIcon />

        </IconButton>
      </Box>

    </Card>
  );
};

export default MainCard;
