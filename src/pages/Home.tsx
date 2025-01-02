/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Preloader from "../components/Preloder";
import InfinfinityGridCard from "../components/InfinfinityGridCard";
import { usePage } from "../utils/contextapi/PageContext";
import { IpropsData } from "../utils/types/types";

const Home = () => {
  const { page, setPage, loading, setLoading } = usePage();
  const [data, setData] = useState<IpropsData[]>([]);

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
