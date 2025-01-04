import React, {useState } from 'react'
import { IconButton } from '@mui/material'
import TextField from '@mui/material/TextField'
import SearchIcon from '@mui/icons-material/Search'
import { useNavigate } from 'react-router-dom'


const SearchForm = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setQuery('');

    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query)}`)
    }

  }

  return (
    <>
      <form onSubmit={handleSubmit} action="#" className="searchForm" >
        <TextField
          className="form_Input"
          style={{ width: '100%' }}
          placeholder="Search Moment's you wish for..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          InputProps={{

            endAdornment: (
              <IconButton type="submit">
                <SearchIcon />
              </IconButton>
            ),
          }}
        />
      </form>
    </>
  )
}

export default SearchForm;
