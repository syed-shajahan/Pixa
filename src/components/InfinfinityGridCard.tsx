import Box from "@mui/material/Box";
import { CircularProgress } from "@mui/material";
import MainCard from "../components/MainCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { FC, useState } from "react";
import PopupModal from "./PopupModal";
import { IpropsData } from "../utils/types/types";

interface InfinfinityGridCardProps {
  data: IpropsData[];
  setPage?: React.Dispatch<React.SetStateAction<number>>;
  loading?: boolean;
}

const InfinfinityGridCard: FC<InfinfinityGridCardProps> = ({
  data,
  setPage = () => {},
  loading,
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
      {loading && (
        <Box
          style={{
            position: "fixed",
            left: "50%",
            top: "50%",
            transform: ` translate(-50%, -50%)`,
            zIndex: "100",
          }}
        >
          <CircularProgress />
        </Box>
      )}
      <InfiniteScroll
        dataLength={data.length}
        next={() => setPage((prevPage: any) => prevPage + 1)}
        hasMore={true}
        loader={<></>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <Box
          sx={{
            columns: { md: "2", sm: "2", xs: "1", lg: "3" },
            columnGap: "10px",
          }}
        >
          {data?.map((item, index) => (
            <Box
              key={index}
              sx={{ width: "100%", marginBottom: "10px", breakInside: "avoid" }}
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
