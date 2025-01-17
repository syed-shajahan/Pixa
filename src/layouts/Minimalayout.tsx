import { Box } from '@mui/material';
import React from 'react';
import { PageProvider } from '../utils/contextapi/PageContext';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const Minimalayout = () => {

  const likedPosts = useSelector((state: RootState) => state.likePosts.likedPost); 

  return (
    <>
      <Box>
        <h1>TestLayout</h1>
        <p>This layout is for testing purposes.</p>

        {/* Display data from the Redux store */}
        <Box>
          <h2>Liked Posts:</h2>
          {likedPosts.length > 0 ? (
             <Box className="gridContainer">
             {/* <InfinfinityGridCard data={data} setPage={setPage} /> */}
           </Box>
          ) : (
            <p>No liked posts yet.</p>
          )}
        </Box>
      </Box>

      {/* Render child components */}
      <PageProvider>
        <Outlet />
      </PageProvider>
    </>
  );
};

export default Minimalayout;
