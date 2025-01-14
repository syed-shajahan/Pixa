import { Box, Typography } from "@mui/material";

import { useSelector } from "react-redux";

// import FavoriteIcon from "@mui/icons-material/Favorite";
import InterestsIcon from '@mui/icons-material/Interests';
import InfinfinityGridCard from "../../components/InfinfinityGridCard";
import { RootState } from "../../store/store";
const LikesPage = () => {
  const likedPost = useSelector( (state: RootState) => state.likePosts.likedPost);

  
  return (
    <>
      <Box className="gridContainer">
        <Box marginBottom={"20px"} display={'flex'} alignItems={'center'}>
          <Typography variant="h3">Your Likes</Typography>
          <InterestsIcon
            fontSize="large"
            sx={{
              color: "#CCC",
              marginLeft: "10px",
            }}
          />
        </Box>
        <InfinfinityGridCard data={likedPost} />
      </Box>
    </>
  );
};

export default LikesPage;
