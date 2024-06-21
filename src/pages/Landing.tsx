/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { IconButton, Stack } from '@mui/material'
import CollectionsOutlinedIcon from '@mui/icons-material/CollectionsOutlined'
import { LandingPageTitles } from '../utils/CommonConst'
import PopupModal from '../components/PopupModal'
import SearchForm from '../components/SearchForm'
import MainCard from '../components/MainCard'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import Preloader from '../components/Preloder'
import InfiniteScroll from 'react-infinite-scroll-component'

export interface IpropsData {
  alt_description: string
  urls: ImageUrls
  sponsorship: IsponserShips
  user: Iusers
}

interface ImageUrls {
  raw: string
  full: string
  small: string
  regular: string
}

interface IsponserShip {
  instagram_username: string
  twitter_username: string
}

interface IsponserShips {
  sponsor: IsponserShip
}

interface IprofilePictureProps {
  medium: string
  large: string
  regular: string
}

interface Iusers {
  first_name: string
  profile_image: IprofilePictureProps
}

const Landing = () => {
  const Access_Key = '4gljNh90wF9AyrmnoBbBgA8XvJJoo3LvpmjbHrKRLYY'
  const [data, setData] = useState<IpropsData[]>([])
  const [query, setQuery] = useState('')
  const [page, setPage] = useState<number>(1)
  const [open, setOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [likes, setLikes] = useState<{ [key: number]: boolean }>({})
  const [loading, setLoading] = useState<boolean>(false)
  const [hasMore, setHasMore] = useState<boolean>(true)

  const fetchData = useCallback(async () => {
    const API_URL = query
      ? `https://api.unsplash.com/search/photos?query=${query}&client_id=${Access_Key}&page=${page}`
      : `https://api.unsplash.com/photos/?client_id=${Access_Key}&page=${page}`

    setLoading(true)
    try {
      const response = await fetch(API_URL)
      const responseData = await response.json()
      if (responseData.results) {
        if (responseData.results.length === 0) {
          setHasMore(false)
        } else {
          setData((prevData) => [...prevData, ...responseData.results])
        }
      } else {
        if (responseData.length === 0) {
          setHasMore(false)
        } else {
          setData((prevData) => [...prevData, ...responseData])
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
    setLoading(false)
  }, [page, query])

  console.log(page, 'is this')

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setPage(1)
    setData([])
    setHasMore(true)
    fetchData()
  }

  const handleClickOpen = (index: number) => {
    setOpen(true)
    setCurrentIndex(index)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handlePrevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? data.length - 1 : prevIndex - 1,
    )
  }

  const handleNextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === data.length - 1 ? 0 : prevIndex + 1,
    )
  }

  const handleLike = (index: number) => {
    setLikes((prevLikes) => ({
      ...prevLikes,
      [index]: !prevLikes[index],
    }))
  }

  const handlePageUp = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <section className="landing_sec">
        <Box className="container">
          <a href="/" className="logo_txt">
            <Typography variant="h1" textAlign={'center'} component="h1">
              {LandingPageTitles.LOGO_TITLES}
              <CollectionsOutlinedIcon className="camera" />
            </Typography>
          </a>

          <SearchForm
            handleSubmit={handleSubmit}
            query={query}
            setQuery={setQuery}
          />

          {loading && page === 1 ? (
            <Preloader />
          ) : (
            <Box className="gridContainer">
              <InfiniteScroll
                dataLength={data.length}
                next={() => setPage((prevPage) => prevPage + 1)}
                hasMore={hasMore}
                loader={<h1>loading...</h1>}
                endMessage={
                  <p style={{ textAlign: 'center' }}>
                    <b>Yay! You have seen it all</b>
                  </p>
                }
              >
                <Grid container spacing={2}>
                  {data?.map((item, index) => (
                    <Grid item lg={6} md={6} xs={12} key={index}>
                      <MainCard
                        item={item}
                        index={index}
                        likes={likes}
                        handleLike={handleLike}
                        handleClickOpen={handleClickOpen}
                      />
                    </Grid>
                  ))}
                </Grid>
              </InfiniteScroll>
            </Box>
          )}

          <Box
            sx={{
              flex: '1',
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              marginBottom: '20px !important',
            }}
          >
            <Stack
              spacing={2}
              sx={{
                margin: '10px auto 20px',
                maxWidth: '800px',
              }}
            ></Stack>
          </Box>
        </Box>

        <PopupModal
          open={open}
          handlePrevImage={handlePrevImage}
          currentIndex={currentIndex}
          handleClose={handleClose}
          handleNextImage={handleNextImage}
          data={data}
        />

        <IconButton className="toTopBtn" onClick={handlePageUp}>
          <ArrowUpwardIcon />
        </IconButton>
      </section>
    </>
  )
}

export default Landing
