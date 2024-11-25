// Imports dependencies
import React, { useState } from 'react';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import { IconButton } from '@mui/material';

const Header = (props) => {
    // Create a useState Hook
    const [inputValue, setInputValue] = useState('');
    const [darkMode, setDarkMode] = useState(true);
    const [searchButtonClicked, setSearchButtonClicked] = useState(false);
    
    function handleChange(event) {
        // Handles the input values
        setInputValue(event.target.value);
        props.inputValue(event.target.value)
    };

    async function handleSubmit(event) {
        event.preventDefault(); // Prevent the default form submission
        setSearchButtonClicked(!searchButtonClicked)
        props.searchButtonClicked(!searchButtonClicked)
        
    };
    function hangleModeClick() {
       
        setDarkMode(!darkMode);
        props.darkMode(!darkMode)
    }

    return (
        <>
            <div className='container-fluid d-flex justify-content-between pt-2'>
                <div className='col ps-3'>
                    <h1>Weather Application</h1>
                </div>
                <div className='d-flex justify-content-between'>
                    <div className='mx-2'>
                        <form onClick={handleSubmit}>
                            
                            <div className="input-group col">
                             
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    value={inputValue}  
                                    placeholder="Location Search"
                                    onChange={handleChange} 
                                    aria-label="Input group example" 
                                    aria-describedby="basic-addon1" 
                                    required/>
                                
                                <button type="submit"  className="btn btn-primary"><i className="bi bi-search"></i></button>
                            </div>
                        
                                          
                        </form>
                    </div>
                       
                
                    <div className='pb-0 pe-md-3 pe-0'> 
                        {darkMode
                        ? 
                        <IconButton onClick={hangleModeClick} aria-label="moon icon">
                            <NightsStayIcon fontSize="large" />
                        </IconButton>
                        :
                        <IconButton onClick={hangleModeClick} aria-label="sun icon">
                            <WbSunnyIcon fontSize="large" />
                        </IconButton>
                        }
                    </div>
                </div>
                
            </div>
            
        </>
    );
};

export default Header;
