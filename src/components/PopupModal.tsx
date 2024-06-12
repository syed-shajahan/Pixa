import Box from '@mui/material/Box'
import { IconButton } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { FC } from 'react'
import { IpropsData } from '../pages/Landing'

interface IPopupModalProps {
  open: boolean;
  data: IpropsData[];
  handlePrevImage: () => void;
  handleNextImage: () => void;
  currentIndex: number;
  handleClose: () => void;
}

const PopupModal: FC<IPopupModalProps> = ({
  open,
  handlePrevImage,
  currentIndex,
  handleClose,
  handleNextImage,
  data,
}) => {
  return (
    <>
      <Dialog
        className="custom_modal"
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          style: {
            width: '95%',
            maxWidth: '680px',
            overflowY:'unset',
            margin: '0px',
            maxHeight: 'auto',
          },
        }}
      >
        <DialogActions>
          <IconButton
            onClick={handleClose}
            sx={{ padding: '0px', marginTop: '5px', marginRight: '5px' }}
          >
            <CloseOutlinedIcon />
          </IconButton>
        </DialogActions>
      

        {/* image-like content-below */}
        <Box className="aspectImgs" sx={{ position: 'relative'}}>
          
          <img
            className="aspectImages"
            src={data[currentIndex]?.urls.regular}
            alt=""
          />
       
          <a
            href={data[currentIndex]?.urls.regular}
            className="img_downLoadBtn"
            download
            target="\blank"
          >
            <IconButton>
              <FileDownloadOutlinedIcon />
            </IconButton>
          </a>
          <IconButton className="slider_btns left" onClick={handlePrevImage}>
            <ArrowBackIosIcon />
          </IconButton>
          <IconButton className="slider_btns right" onClick={handleNextImage}>
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>
        {/* image-like content-ends-here */}
        <DialogContent
          sx={{ padding: '12px', height: '65px', color:"red !Important", overflowY:"unset !Important" }}
        >
          <DialogContentText id="alert-dialog-description" sx={{fontSize:{xs:"13px", md:"15px"}}}>
            {data[currentIndex]?.alt_description}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default PopupModal
