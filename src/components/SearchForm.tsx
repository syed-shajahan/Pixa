import React, { FC } from 'react'
import { IconButton } from '@mui/material'
import TextField from '@mui/material/TextField'
import SearchIcon from '@mui/icons-material/Search'

interface ISearchProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  query: string
  setQuery: (query: string) => void
}
const SearchForm: FC<ISearchProps> = ({ handleSubmit, query, setQuery }) => {
  return (
    <>
      <form onSubmit={handleSubmit} action="#" className="searchForm">
        <TextField
          className="form_Input"
          variant="outlined"
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

export default SearchForm
