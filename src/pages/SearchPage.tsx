import React from "react";
import {useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { IconButton, Stack } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import Preloader from "../components/Preloder";
import InfinfinityGridCard from "../components/InfinfinityGridCard";
import { IpropsData } from "./Home";

import { useSearchParams } from "react-router-dom";

const SearchPage = () => {


  const [searchParams] = useSearchParams();

  const query = searchParams.get("query") || "";


  const Access_Key = "4gljNh90wF9AyrmnoBbBgA8XvJJoo3LvpmjbHrKRLYY";
    const [data, setData] = useState<IpropsData[]>([]);
    const [page, setPage] = useState<number>(1);
  
    const [loading, setLoading] = useState<boolean>(false);

    const SearchApi = async ()=> {
      if (!query.trim()) return;
      setLoading(true);
      try {
        const data = await fetch(`https://api.unsplash.com/search/photos?query=${query}r&client_id=${Access_Key}&page=${page}`);
        const res = await data.json();
        setData(res.results)
        
      } catch (error) {
        console.log('loading failed');
      }
      setLoading(false);
    }


    useEffect(() => {
      SearchApi();
    }, [query, page])
    

    const handlePageUp = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };


  return (
    <Box>
      {/* <SearchForm /> */}


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
    </Box>
  );
};

export default SearchPage;
