import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Preloader from "../../components/Preloder";
import InfinfinityGridCard from "../../components/InfinfinityGridCard";
import { useSearchParams } from "react-router-dom";
import { IpropsData } from "../../utils/types/types";
import { usePage } from "../../utils/contextapi/PageContext";

const SearchPage = () => {
   const { page, setPage, loading, setLoading } = usePage();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const [data, setData] = useState<IpropsData[]>([]);

  const SearchApi = async () => {
    if (!query.trim()) return;

    setLoading(true);
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${query}&client_id=${process.env.REACT_APP_ACCESS_KEY}&page=${page}`
      );
      const res = await response.json();

      if (res?.results?.length) {
      
        setData((prev) => [...prev, ...res.results]);
      } else if (page === 1) {
       
        setData([]);
      }
    } catch (error) {
      console.error("Error loading data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    
 
    setPage(1);

    SearchApi();
  }, [query]);

  useEffect(() => {
    if (page > 1) SearchApi();
  }, [page]);

  return (
    <Box>
      <Box className="landing_sec">
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
      </Box>
    </Box>
  );
};

export default SearchPage;
