import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { IconButton, Stack } from '@mui/material';
// import Pagination from '@mui/material/Pagination';
import CollectionsOutlinedIcon from '@mui/icons-material/CollectionsOutlined';
import { LandingPageTitles } from '../utils/CommonConst';
import PopupModal from '../components/PopupModal';
import SearchForm from '../components/SearchForm';
import MainCard from '../components/MainCard';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import Preloader from '../components/Preloder';

export interface IpropsData {
  alt_description: string;
  urls: ImageUrls;
  sponsorship: IsponserShips;
  user: Iusers;
}

interface ImageUrls {
  raw: string;
  full: string;
  small: string;
  regular: string;
}

interface IsponserShip {
  instagram_username: string;
  twitter_username: string;
}

interface IsponserShips {
  sponsor: IsponserShip;
}

interface IprofilePictureProps {
  medium: string;
  large: string;
  regular: string;
}

interface Iusers {
  first_name: string;
  profile_image: IprofilePictureProps;
}

const Landing = () => {
  const Access_Key = '4gljNh90wF9AyrmnoBbBgA8XvJJoo3LvpmjbHrKRLYY';
  const [data, setData] = useState<IpropsData[]>([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState<number>(1);
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [likes, setLikes] = useState<{ [key: number]: boolean }>({});
  const [loading, setLoading] = useState<boolean>(false); 

  useEffect(() => {
    const API_URL = query
      ? `https://api.unsplash.com/search/photos?query=${query}&client_id=${Access_Key}&page=${page}`
      : `https://api.unsplash.com/photos/?client_id=${Access_Key}&page=${page}`;

    const fetchData = async () => {
      setLoading(true); 
      try {
        const response = await fetch(API_URL);
        const responseData = await response.json();
        setData((prevData) => (query ? [...prevData, ...responseData.results] : [...prevData, ...responseData]));
        console.log(responseData, 'test');
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setLoading(false); 
    };
    fetchData();
    query && window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const API_URL2 = `https://api.unsplash.com/search/photos?query=${query}&client_id=${Access_Key}&page=1`;

    try {
      setLoading(true); 
      const response = await fetch(API_URL2);
      const responseData = await response.json();
      setData(responseData.results);
      setLoading(false); 
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false); 
    }
    setQuery("");
  };

  const handleClickOpen = (index: number) => {
    setOpen(true);
    setCurrentIndex(index);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePrevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? data.length - 1 : prevIndex - 1));
  };

  const handleNextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex === data.length - 1 ? 0 : prevIndex + 1));
  };

  const handleLike = (index: number) => {
    setLikes((prevLikes) => ({
      ...prevLikes,
      [index]: !prevLikes[index],
    }));
  };

  const handlePageUp = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInfiniteScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleInfiniteScroll);
    return () => window.removeEventListener('scroll', handleInfiniteScroll);
  }, []);

  return (
    <>
      <section className="landing_sec">
        <Box className="container">
          <a href="/" className="logo_txt">
            <Typography variant="h1" textAlign={'center'} component="h1">
              {LandingPageTitles.LOGO_TITLES}
              <CollectionsOutlinedIcon className="camera" />
            </Typography>
          </a>

          <SearchForm handleSubmit={handleSubmit} query={query} setQuery={setQuery} />

          {loading ? (
            <Preloader /> 
          ) : (
            <Box className="gridContainer">
              <Grid container spacing={2}>
                {data?.map((item, index) => {
                  return (
                    <Grid item lg={6} md={6} xs={12} key={index}>
                      <MainCard item={item} index={index} likes={likes} handleLike={handleLike} handleClickOpen={handleClickOpen} />
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          )}

          <Box
            sx={{
              flex: '1',
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              marginBotton: '20px !important',
            }}
          >
            <Stack
              spacing={2}
              sx={{
                margin: '10px auto 20px',
                maxWidth: '800px',
              }}
            >
              {/* <Pagination
                page={page}
                count={100}
                color="secondary"
                onChange={handlePageChange}
              /> */}
            </Stack>
          </Box>
        </Box>

        <PopupModal
          open={open}
          handlePrevImage={handlePrevImage}
          currentIndex={currentIndex}
          handleClose={handleClose}
          handleNextImage={handleNextImage}
          data={data}
        />

        <IconButton className="toTopBtn" onClick={handlePageUp}>
          <ArrowUpwardIcon />
        </IconButton>
      </section>
    </>
  );
};

export default Landing;
