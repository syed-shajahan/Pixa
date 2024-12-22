import Box from "@mui/material/Box";
import { CircularProgress } from "@mui/material";
import MainCard from "../components/MainCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { IpropsData } from "../pages/Home";
import { FC, useState } from "react";
import PopupModal from "./PopupModal";

interface InfinfinityGridCardProps {
    data: IpropsData[];
    setPage: React.Dispatch<React.SetStateAction<number>>;
}

const InfinfinityGridCard: FC<InfinfinityGridCardProps> = ({
  data,
  setPage,
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
        next={() => setPage((prevPage: any) => prevPage + 1)}
        hasMore={true}
        loader={
          <div
            style={{
              position: "fixed",
              left: "50%",
              top: "50%",
              transform: ` translate(-50%, -50%)`,
              zIndex: "100",
            }}
          >
            <CircularProgress />
          </div>
        }
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <Box
          sx={{
            columns: { md: "2", sm: "1", xs: "1", lg: "3" },
            columnGap: "20px",
          }}
        >
          {data?.map((item: any, index: number) => (
            <Box key={index} sx={{ width: "100%", marginBottom: "20px" }}>
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
