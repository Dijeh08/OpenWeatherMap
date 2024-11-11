// Imports dependencies
import React, { useState } from 'react';
import axios from 'axios';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import { IconButton } from '@mui/material';

const Header = (props) => {
    // Create a useState Hook
    const [inputValue, setInputValue] = useState('');
    const [whiteBackground, setwhiteBackground] = useState(false);
    const [blackBackground, setblackBackground] = useState(true);
    
     
    const openWeatherMap_key = import.meta.env.VITE_SECRET_KEY;
    
    const handleChange = (event) => {
        // Handles the input values
        setInputValue(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent the default form submission
        
        try {
            // Fetch data from the URL
            const response = await axios({
                method: 'GET',
                url: `http://api.openweathermap.org/geo/1.0/direct?q=${inputValue}&limit=5&appid=${openWeatherMap_key}`,
            });
            const latitude = response.data[0].lat;
            const longitude = response.data[0].lon;
            const state = response.data[0].state;
            const country = response.data[0].country;

            const result = await axios ({
                
                method: 'POST',
                url: 'http://localhost:3001/filter',
                data: ({
                    country: country
                })
            })
            
            
            setResponseMessage(result.data); // Assuming the server responds with a message
            props.long(longitude);
            props.latt(latitude);
            
            props.state(state);
            props.country(result.data)
            props.inputValue(inputValue);
            
        } catch (error) {
            console.error('Error sending data:', error);
          
        }
    };
    const hangleWhiteBackground = () =>{
       
        setwhiteBackground(!whiteBackground);
        setblackBackground(!blackBackground)
        props.background()
    }

    const hangleblackBackground = () =>{
        
        setwhiteBackground(!whiteBackground);
        setblackBackground(!blackBackground)
        props.background()
    }
    return (
        <>
            <div className='container-fluid d-flex justify-content-between pt-2 mt-2'>
                <div className='col ps-3'>
                    <h1>Weather Application</h1>
                </div>
                <div className='d-flex justify-content-between'>
                    <div className='mx-2'>
                        <form onSubmit={handleSubmit}>
                            
                            <div className="input-group col">
                                <span className="input-group-text" id="basic-addon1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"></path>
                                    </svg>
                                </span>
                                <input 
                                    type="text" 
                                    className="form-control " 
                                    value={inputValue}  
                                    placeholder="Location Search"
                                    onChange={handleChange} 
                                    aria-label="Input group example" 
                                    aria-describedby="basic-addon1" 
                                    required/>
                            </div>
                        
                                          
                        </form>
                    </div>
                       
                
                    <div className='pb-0 pe-3'> 
                        {whiteBackground
                        ? 
                        <IconButton onClick={hangleWhiteBackground} aria-label="sun icon" style={{color: 'red'}}>
                            <WbSunnyIcon fontSize="large" />
                        </IconButton>
                        : 
                        <IconButton onClick={hangleblackBackground} aria-label="moon icon" style={{color: 'white'}}>
                            <NightsStayIcon fontSize="large" />
                        </IconButton>}
                    </div>
                </div>
                
            </div>
            
        </>
    );
};

export default Header;
