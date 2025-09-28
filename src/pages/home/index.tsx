import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import Box from "@mui/material/Box";
import Preloader from "../../components/Preloder";
import InfinfinityGridCard from "../../components/InfinfinityGridCard";
import WelcomeMessage from "../../components/WelcomeMessage";
import { IpropsData } from "../../utils/types/types";

const fetchPixaApi = async ({ pageParam = 1 }): Promise<IpropsData[]> => {
  const accessKey = process.env.REACT_APP_ACCESS_KEY;

  if (!accessKey) {
    throw new Error("REACT_APP_ACCESS_KEY is not defined");
  }

  const API_URL = `https://api.unsplash.com/photos/?client_id=${accessKey}&page=${pageParam}`;
  const { data } = await axios.get(API_URL);
  return data;
};

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
        {isLoading ? (
          <Preloader />
        ) : isError ? (
          <div>Error: {(error as Error).message}</div>
        ) : (
          <Box className="gridContainer">
            <InfinfinityGridCard
              data={allPhotos}
              fetchNextPage={fetchNextPage}
              hasNextPage={hasNextPage ?? false}
              isFetchingNextPage={isFetchingNextPage}
            />
          </Box>
        )}
      </Box>
    </section>
  );
};

export default Home;
