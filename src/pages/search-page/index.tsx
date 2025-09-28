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
  const [totalPages, setTotalPages] = useState<number | null>(null);

  const SearchApi = async () => {
    if (!query.trim()) return;

    setLoading(true);
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${query}&client_id=${process.env.REACT_APP_ACCESS_KEY}&page=${page}`
      );
      const res = await response.json();

      if (res?.results?.length) {
        setData((prev) => (page === 1 ? res.results : [...prev, ...res.results]));
        setTotalPages(res.total_pages);
      } else if (page === 1) {
        setData([]);
        setTotalPages(0);
      }
    } catch (error) {
      console.error("Error loading data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    setPage(1);
  }, [query]);

  useEffect(() => {
    SearchApi();
  }, [page, query]);

  const fetchNextPage = () => {
    if (!loading && hasNextPage) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const hasNextPage = totalPages !== null && page < totalPages;

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
                fetchNextPage={fetchNextPage}
                hasNextPage={hasNextPage}
                isFetchingNextPage={loading && page > 1}
              />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default SearchPage;
