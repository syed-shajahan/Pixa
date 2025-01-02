import React from "react";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Preloader from "../components/Preloder";
import InfinfinityGridCard from "../components/InfinfinityGridCard";

import { useSearchParams } from "react-router-dom";
import { usePage } from "../utils/contextapi/PageContext";
import { IpropsData } from "../utils/types/types";

const SearchPage = () => {
  const { page, setPage, loading, setLoading } = usePage();

  const [searchParams] = useSearchParams();

  const query = searchParams.get("query") || "";

  const [data, setData] = useState<IpropsData[]>([]);

  const SearchApi = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const data = await fetch(
        `https://api.unsplash.com/search/photos?query=${query}&client_id=${process.env.REACT_APP_ACCESS_KEY}&page=${page}`
      );
      const res = await data.json();
      setData((prevData) => [...prevData, ...res.results]);
      console.log(data, "here");
    } catch (error) {
      console.log("loading failed");
    }
    setLoading(false);
  };

  useEffect(() => {
    SearchApi();
  }, [page, query]);

  return (
    <Box>
      {/* <SearchForm /> */}

      <section className="landing_sec">
        <Box className="container">
          {loading && page === 1 ? (
            <Preloader />
          ) : (
            <Box className="gridContainer">
              <InfinfinityGridCard
                data={data}
                setPage={setPage}
                loading={loading}
              />
            </Box>
          )}
        </Box>
      </section>
    </Box>
  );
};

export default SearchPage;
