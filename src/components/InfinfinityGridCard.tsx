import Box from "@mui/material/Box";
import { CircularProgress, Typography } from "@mui/material";
import MainCard from "../components/MainCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { FC, useState } from "react";
import PopupModal from "./PopupModal";
import { IpropsData } from "../utils/types/types";

interface InfinfinityGridCardProps {
  data: IpropsData[];
  fetchNextPage?: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
}

const InfinfinityGridCard: FC<InfinfinityGridCardProps> = ({
  data,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}) => {
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handleClickOpen = (index: number) => {
    setOpen(true);
    setCurrentIndex(index);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePrevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? data.length - 1 : prevIndex - 1     
    );
  };

  const handleNextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === data.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <>
      <InfiniteScroll
        dataLength={data.length}
        next={fetchNextPage ?? (() => {})}  
        hasMore={hasNextPage ?? false}
        loader={
          <Box sx={{ textAlign: "center", mt: 2 }}>
            {isFetchingNextPage && <CircularProgress />}
          </Box>
        }
        endMessage={
          <Typography sx={{ textAlign: "center", mt: 2 }}>
            Yay! You have seen it all
          </Typography>
        }       
      >
        <Box
          sx={{
            columns: { md: 2, sm: 2, xs: 1, lg: 3 },
            columnGap: "10px",
          }}
        >
          {data.map((item, index) => (
            <Box
              key={index}
              sx={{
                width: "100%",
                marginBottom: "10px",
                breakInside: "avoid",
              }}
            >
              <MainCard
                item={item}
                index={index}
                handleClickOpen={handleClickOpen}
              />
            </Box>
          ))}
        </Box>
      </InfiniteScroll>

      <PopupModal
        open={open}
        handlePrevImage={handlePrevImage}
        currentIndex={currentIndex}
        handleClose={handleClose}
        handleNextImage={handleNextImage}
        data={data}
      />
    </>
  );
};

export default InfinfinityGridCard;
