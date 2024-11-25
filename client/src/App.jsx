import React, { useEffect, useState } from 'react'; //import react module
import Header from './components/Header' // Import Header component
import './App.css'; //Import App stylesheet
import axios from 'axios'; // Import Axios
import CurrentForcast from './components/CurrentForcast';
import HourlyForcast from './components/HourlyForcast';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Footer from './components/footer';
import { countryNames } from './components/countryData';

function App() {
  
  const [darkMode, setDarkMode] = useState(true);
  const [country, setCountry] = useState(null);
  const [state, setState] = useState(null)
  const [input, setInput] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [weather3HrsData, setWeather3HrsData] = useState([]);
  const controller = new AbortController();
  const signal = controller.signal;
  const htmlElement = document.querySelector('html');
                      htmlElement.setAttribute('data-bs-theme', darkMode? 'dark':'light');
  const openWeatherMap_key = import.meta.env.VITE_SECRET_KEY;
  const positionStack_key = import.meta.env.VITE_POSITIONSTACK_KEY;

 
  function hangleModeClick(mode) {
    setDarkMode(mode);
  }

  function handleInputValue(state) {
    setInput(state);
  }

  async function APIcall(params) {

    try {
      const locationResponse = await axios({
        method: 'GET',
        url: `https://api.positionstack.com/v1/forward?access_key=${positionStack_key}&query=${input}`,
        //  `https://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=5&appid=${openWeatherMap_key}`,
      });
      console.log(locationResponse.data.data[0])
      // const latitude = locationResponse.data[0].latitude;
      // const longitude = locationResponse.data[0].longitude;
      const {region, country, latitude, longitude} = locationResponse.data.data[0];
      setState(region);
      console.log(region, country, latitude, longitude)
      // const result = (countryNames.filter(particularCountry => particularCountry.Code === country))[0].Name;
      
    setCountry(country);
    const currentWeatherResponse = await axios ({
      method: 'GET',
      url: `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${openWeatherMap_key}`,
    }, {signal});
  console.log(currentWeatherResponse.data)
  setWeatherData(currentWeatherResponse.data)
    

  const forcast = await axios({
      method: "GET",
      url: `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${openWeatherMap_key}`
    },{signal});
  
  setWeather3HrsData(forcast.data.list)
  console.log(forcast.data.list)
} catch (error) {
  console.error('Error sending data:', error);
}
  }

  async function handleSearchButtonClicked(params) {
    
    console.log(params)
    APIcall();
  }
  
  function CreateWeatherCard(params, index) {
   
    return(
      <HourlyForcast 
        data={params}
        key={index}/>
    )
  }
  return(
    <>
    
      <div className='bg-success'>
          <Header 
          darkMode={hangleModeClick}
          inputValue={handleInputValue}
          searchButtonClicked={handleSearchButtonClicked}/>
      </div>
      
      <div className='' style={{marginTop: '5px'}}>
          <CurrentForcast
            data={weatherData}
            state={state}
            country={country}
            input={input}/>
      </div>

      {weather3HrsData.length > 0 &&
      <div className=''>
        <div className='text-center bg-success p-2 mt-1'><h3>5 Day/ 3 HOUR FORCAST</h3></div>
        <div className='overflow-x-scroll d-flex'>
          {weather3HrsData.map(CreateWeatherCard)}
          
        </div> 
        
      </div>
      }
      <Footer/>

    </>
  )
}
export default App;