import "../index.css";
import SearchForm from "../components/SearchForm";
import { Box, Typography } from "@mui/material";
import CollectionsOutlinedIcon from "@mui/icons-material/CollectionsOutlined";
import { LandingPageTitles } from "../utils/CommonConst";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
const Header = () => {
  const likesCount= useSelector((state:RootState)=> state.likePosts.likedPost)
  return (
    <Box>
      <Link to="/" className="logo_txt">
        <Typography
          variant="h1"
          textAlign={"center"}
          marginTop={"20px"}
          component="h1"
        >
          {LandingPageTitles.LOGO_TITLES}
          <CollectionsOutlinedIcon className="camera" />
        </Typography>
      </Link>

      <Box display={"flex"} alignItems={"center"} justifyContent={'start'} padding={'0px 10px'} sx={{width:'90%', margin:"0px auto "}} >
        <SearchForm />


        {
          likesCount && likesCount.length  > 0 && (
            <Link to='/likePost' title='your like posts here' className="likeLink">
            <FavoriteIcon style={{ color: "#CCC" }} />
   
               <Box className='flotNumber'>
                 {likesCount.length}
               </Box>
           </Link>
          )
        }

       
      </Box>
    </Box>
  );
};

export default Header;
