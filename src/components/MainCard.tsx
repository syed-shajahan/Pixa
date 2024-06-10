import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { IconButton } from '@mui/material'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { FC } from 'react'
import { IpropsData } from '../pages/Landing'

interface IpropsMainCard {
    item: IpropsData;
    index: number;
    likes: { [key: number]: boolean };
    handleLike: (index: number) => void;
    handleClickOpen: (index: number) => void;
}

const MainCard: FC<IpropsMainCard> = ({ item, index, likes, handleLike, handleClickOpen }) => {
  return (
    <Card className="custom_card">
      <Box className="aspectImgs">
        <img
          className="aspectImages cursor_pointer"
          src={item.urls.regular}
          alt=""
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
          title={likes[index] ? 'Unlike' : 'Like'}
          className="like_btn"
          onClick={() => handleLike(index)}
        >
          {likes[index] ? (
            <FavoriteIcon sx={{ color: 'red' }} />
          ) : (
            <FavoriteBorderIcon />
          )}
        </IconButton>
      </Box>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item.user.first_name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {item.alt_description}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default MainCard
