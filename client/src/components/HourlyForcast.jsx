import React, { useState } from 'react';
import axios from 'axios';
import AirIcon from '@mui/icons-material/Air';
import WaterDropIcon from '@mui/icons-material/WaterDrop';

function HourlyForcast(props) {
    
    // Slit Time
    const time = props.data.dt_txt;
    const formattedTime = time.split(' ');

    //Format Description
    const formatedFirstLetter = props.data && (props.data.weather[0].description).charAt(0).toUpperCase();
    const restOfTheLetters = props.data && (props.data.weather[0].description).slice(1).toLowerCase();
    const formattedWeatherDescription = `${formatedFirstLetter}${restOfTheLetters}`;
    
    function getImageURL(name) {
        return new URL(`../assets/images/${name}.png`, import.meta.url).href
    }
    return(
        <>
        
            <div className='border  rounded my-1 col-xm-3 col-md-auto mx-2'>
                <div className='text-center mt-0'><p className='fw-normal'>{props.data? formattedTime[1] : '00:00'}</p></div>
                <div className='text-center mt-0'>{props.data? <img src={getImageURL(props.data.weather[0].icon)} alt={`${formattedWeatherDescription}`} className='w-100'/>: null}</div>
                <div className='text-center mt-0'><p className='fw-medium'>{props.data? props.data.main.temp: 0}<sup>o</sup>C</p></div>
                <div className='text-center mt-0'><p className='fw-medium'><AirIcon/>{props.data? props.data.wind.speed: 0} mph</p></div>
                
                <div className='text-center mt-0 bg-primary w-100'><p className='w-100 fw-bolder'>{props.data?  formattedWeatherDescription: 'Description'}</p></div>
    
            </div>
        </>
    )
}
export default HourlyForcast