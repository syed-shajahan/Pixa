import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { usePage } from '../utils/contextapi/PageContext';

const categories = [
  { id: 1, name: "aesthetics" },
  { id: 2, name: "portraits" },
  { id: 3, name: "wildlife" },
  { id: 4, name: "cityscapes" },
  { id: 5, name: "abstract" },
  { id: 6, name: "black & white" },
  { id: 7, name: "macro" },
  { id: 8, name: "aerial" },
  { id: 9, name: "food photography" },
  { id: 10, name: "fashion" },
  { id: 11, name: "travel" },
  { id: 12, name: "architecture" },
  { id: 13, name: "underwater" },
  { id: 14, name: "sports" },
  { id: 15, name: "astrophotography" },
  { id: 16, name: "street photography" },
  { id: 17, name: "nature" },
  { id: 18, name: "documentary" },
  { id: 19, name: "product photography" },
  { id: 20, name: "fine art" },
];

const TopCategories = () => {
  const { setPage } = usePage();
  const navigate = useNavigate();
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setPage(1);
    setValue(newValue);
    const selectedCategory = categories[newValue]?.name.trim() || '';
    navigate(`/search?query=${encodeURIComponent(selectedCategory)}`);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        bgcolor: 'background.paper',
        maxWidth: '1400px',
        margin: 'auto',
        padding: '0px 10px',
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        aria-label="scrollable force tabs example"
        sx={{
       
          color:"red", 
          '.MuiTabs-scroller': {
            borderRadius: '50px', 
          },
          '& .MuiTabs-indicator': {
            backgroundColor: '#000', 
          },
          display: 'flex',
          alignItems: 'center',
          '& .MuiTab-root': {
            fontSize: { xs: '14px', lg: '12px' },
          },
          '@media (max-width:600px)': {
            borderRadius: '50px',
            '& .MuiTabs-scrollButtons': {
              display: 'none', 
            },
          },
        }}
      >
        {categories.map((category) => (
          <Tab key={category.id} label={category.name} />
        ))}
      </Tabs>
    </Box>
  );
};

export default TopCategories;
