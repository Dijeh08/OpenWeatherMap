import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = () => {
    return (
        <TextField
            variant="outlined"
            placeholder= {<SearchIcon />}
            
            // InputProps={{
            //     startAdornment: (
            //         <InputAdornment position="start">
            //             <SearchIcon />
            //         </InputAdornment>
            //     ),
            // }}
            fullWidth
        />
    );
};

export default SearchBar;
