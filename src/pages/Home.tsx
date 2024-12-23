/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { IconButton, Stack } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import Preloader from "../components/Preloder";
import InfinfinityGridCard from "../components/InfinfinityGridCard";

export interface IpropsData {
  alt_description: string;
  urls: ImageUrls;
  sponsorship: IsponserShips;
  user: Iusers;
  total_pages?:number;
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

const Home = () => {
  const Access_Key = "4gljNh90wF9AyrmnoBbBgA8XvJJoo3LvpmjbHrKRLYY";
  const [data, setData] = useState<IpropsData[]>([]);
  const [page, setPage] = useState<number>(1);

  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {
    const API_URL = `https://api.unsplash.com/photos/?client_id=${Access_Key}&page=${page}`;

    setLoading(true);
    try {
      const response = await fetch(API_URL);
      const responseData = await response.json();
      setData((prevData) => [...prevData, ...responseData]);
      console.log(responseData, "test");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const handlePageUp = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <section className="landing_sec">
        
        <Box className="container">
          {loading && page === 1 ? (
            <Preloader />
          ) : (
            <Box className="gridContainer">
              <InfinfinityGridCard data={data} setPage={setPage} />
            </Box>
          )}

          <Box
            sx={{
              flex: "1",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              marginBottom: "20px !important",
            }}
          >
            <Stack
              spacing={2}
              sx={{
                margin: "10px auto 20px",
                maxWidth: "800px",
              }}
            ></Stack>
          </Box>
        </Box>

        <IconButton className="toTopBtn" onClick={handlePageUp}>
          <ArrowUpwardIcon />
        </IconButton>
      </section>
    </>
  );
};

export default Home;
