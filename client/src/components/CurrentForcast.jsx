import axios from "axios";
import React from "react";
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import AirIcon from '@mui/icons-material/Air';
import SpeedIcon from '@mui/icons-material/Speed';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Image1 from '../assets/images/1.png';
// import { getImageURL } from "../utils/image-util";

function CurrentForcast(props) {
    // console.log(props.data)
    const formatedFirstLetter = props.data && (props.data.weather[0].description).charAt(0).toUpperCase();
    const restOfTheLetters = props.data && (props.data.weather[0].description).slice(1).toLowerCase();
    const formattedWeatherDescription = `${formatedFirstLetter}${restOfTheLetters}`;

    const d = new Date()

    // function handleImage(params) {
    //         const image = `../assets/images/big/${params}.png`
        
    // }

    function getImageURL(name) {
        return new URL(`../assets/images/${name}.png`, import.meta.url).href
    }
    
    return(
        <>
            <div className='my-1  d-flex justify-content-center'>
              
                <div className="rounded col-4 border border-warning-emphasis  shadow ms-0">
                    <div className="mt-2">
                        <div className="text-center pt-2">{props.data ? <img src={ getImageURL(props.data.weather[0].icon)} alt={`${formattedWeatherDescription}`}/>: <img src={Image1} alt="No weather Icon"/>}</div>
                        
                        <div><h1 className="text-center">{props.data? props.data.main.temp: 0} <sup>o</sup>C</h1></div>
                        <div className="d-flex justify-content-center my-1">
                            <div><i className="bi bi-geo-alt"></i></div>
                            <div><h6>{props.data && props.input}</h6></div>,
                            <div><h6>{props.data && props.state}</h6></div>,
                            <div><h6>{props.data && props.country}.</h6></div>
                            
                        </div>  
                        <div className="d-flex justify-content-between mx-3">
                            <div><p>{d.toDateString()}</p></div>
                            <div><p>{d.toLocaleTimeString()}</p></div>
                        </div>
                    </div>
                    <div><h4 className="text-center">Feels like {props.data? props.data.main.feels_like: 0} <sup>o</sup>C</h4></div>
                    
                    <div className="my-2"><h2 className="text-center">{props.data? formattedWeatherDescription: 0}</h2></div>
                    
                </div>
                <div className="rounded col-8 border border-warning-emphasis ms-4 shadow">
                     <div className="d-flex justify-content-center mt-2">
                        <div className="col-6 m-1 p-0">
                            <div className="d-flex justify-content-center">
                                <div className="text-center ">
                                    <WaterDropIcon/>
                                </div>
                                <div><h4>{props.data? props.data.main.humidity: 0} %</h4></div>
                                
                            </div>
                            <div className="text-center"><p>Humidity</p></div>
                        </div>
                        <div className="col-6 m-1 p-0" > 
                            <div className="d-flex justify-content-center"><div><AirIcon/></div><div><h4>{props.data? props.data.wind.speed: 0} mph</h4></div></div>
                            <div className="text-center"><p>Wind Speed</p></div>
                        </div>
                    </div>

                    <div className="d-flex justify-content-center">
                        <div className="col-6 m-1 p-0">
                            <div className="text-center"><SpeedIcon/><h4>{props.data? props.data.main.pressure: 0} hPa</h4></div>
                            <div className="text-center"><p>Pressure</p></div>
                        </div>
                    
                        <div className="col-6 m-1 p-0"> 
                            <div className="text-center"><VisibilityIcon/><h4>{props.data? props.data.visibility: 0} m</h4></div>
                            <div className="text-center"><p>Visibility</p></div>
                        </div>
                    </div>
                     
                        <div className="col-12 m-1 p-0">
                            <div className="text-center">
                                <i className="bi bi-cloud-sun-fill"></i>
                                
                                <h4>{props.data? props.data.clouds.all: 0} %</h4>
                            </div>
                            <div className="text-center"><p>Clouds Cover</p></div>
                        </div> 
                    
                </div>
              
            </div>
        </>
    )
}
export default CurrentForcast