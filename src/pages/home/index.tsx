import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import Box from "@mui/material/Box";
import Preloader from "../../components/Preloder";
import InfinfinityGridCard from "../../components/InfinfinityGridCard";
import WelcomeMessage from "../../components/WelcomeMessage";
import { IpropsData } from "../../utils/types/types";

import { fetchPixaApi } from "../api/home-api";

const Home = () => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ["unsplashPhotos"],
    queryFn: fetchPixaApi,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 0 ? undefined : allPages.length + 1;
    },
  });

  const allPhotos = data?.pages.flat() ?? [];

  return (
    <section className="landing_sec">
      <Box className="container">
        <WelcomeMessage />

        <Box className="gridContainer">
          {isLoading ? (
            <Preloader />
          ) : isError ? (
            <div>Error: {(error as Error).message}</div>
          ) : (
            <InfinfinityGridCard
              data={allPhotos}
              fetchNextPage={fetchNextPage}
              hasNextPage={hasNextPage ?? false}
              isFetchingNextPage={isFetchingNextPage}
            />
          )}
        </Box>
      </Box>
    </section>
  );
};

export default Home;
