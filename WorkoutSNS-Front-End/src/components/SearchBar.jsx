// SearchBar.js
import React, { useState } from 'react';
import { TextField,Box, Grid,InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/system';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const StyledIconButton = styled(IconButton)(({ theme }) => ({
    color: '#ffffff',
  }));

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => { 
    //page wont reload when user tries to search
    event.preventDefault();
    //user wont be allowed to submit search queries that are empty
    if (query.trim() !== '') {
      onSearch(query);
    }
  };

  return (
    <Box component="form" noValidate autoComplete="off" marginTop={4} marginBottom={4}>
        <Grid container spacing={2} justifyContent="center">
            <Grid item xs={6}>
            <TextField
                fullWidth
                label="Search"
                variant="outlined"
                type='text'
                value={query}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <StyledIconButton
                        aria-label="search"
                        onClick={handleSubmit}
                        edge="end"
                      >
                        <SearchIcon></SearchIcon>  
                      </StyledIconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
        </Grid>
    </Box>
  );
};

export default SearchBar;
