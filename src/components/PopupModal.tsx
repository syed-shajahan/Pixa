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
    open :boolean;
    data: IpropsData[];
    handlePrevImage: ()=>void;
    handleNextImage: ()=>void;
    currentIndex:number;
    handleClose: ()=>void;
  
}

const PopupModal:FC <IPopupModalProps>= ({
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
              width: '100%',
              maxWidth: '680px',
              maxHeight: 'auto',
            },
          }}
        >
          <DialogActions>
            <IconButton onClick={handleClose}>
              <CloseOutlinedIcon />
            </IconButton>
          </DialogActions>
          <DialogContent
            sx={{ padding: '0px 15px', marginBottom: '20px', height: 'auto' }}
          >
            <DialogContentText id="alert-dialog-description">
              {data[currentIndex]?.alt_description}
            </DialogContentText>
          </DialogContent>
          <Box className="aspectImgs" sx={{ position: 'relative' }}>
            <IconButton
              sx={{ position: 'absolute', top: '50%', left: '10px', zIndex: 1 }}
              onClick={handlePrevImage}
            >
              <ArrowBackIosIcon />
            </IconButton>
            <img
              className="aspectImages"
              src={data[currentIndex]?.urls.regular}
              alt=""
            />
            <IconButton
              sx={{
                position: 'absolute',
                top: '50%',
                right: '10px',
                zIndex: 1,
              }}
              onClick={handleNextImage}
            >
              <ArrowForwardIosIcon />
            </IconButton>
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
          </Box>
        </Dialog>
    </>
  )
}

export default PopupModal