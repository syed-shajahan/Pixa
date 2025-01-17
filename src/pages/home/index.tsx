/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Preloader from "../../components/Preloder";
import InfinfinityGridCard from "../../components/InfinfinityGridCard";
import { IpropsData } from "../../utils/types/types";
import { Typography } from "@mui/material";
import WelcomeMessage from "../../components/WelcomeMessage";

const Home = () => {
  const [data, setData] = useState<IpropsData[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {

    const API_URL = `https://api.unsplash.com/photos/?client_id=${process.env.REACT_APP_ACCESS_KEY}&page=${page}`;

    setLoading(true);
    try {
      const response = await fetch(API_URL);
      const responseData = await response.json();
      setData((prevData) => [...prevData, ...responseData]);
    } catch (error) {
      console.error("Error fetching data:", error); 
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  return (
    <>
      <section className="landing_sec">
       
        
        <Box className="container">
        <WelcomeMessage />
          {loading && page === 1 ? (
            <Preloader />
          ) : (
            <Box className="gridContainer">
              <InfinfinityGridCard data={data} setPage={setPage} />
            </Box>
          )}
        </Box>
      </section>
    </>
  );
};

export default Home;
