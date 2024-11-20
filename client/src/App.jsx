import React, { useEffect, useState } from 'react';
import Header from './components/Header'
import './App.css';
import axios from 'axios';
import CurrentForcast from './components/CurrentForcast';
import HourlyForcast from './components/HourlyForcast';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Footer from './components/footer';

function App() {
  
  const [darkMode, setDarkMode] = useState(true);
  const [country, setCountry] = useState(null);
  const [state, setState] = useState(null)
  const [input, setInput] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [weather3HrsData, setWeather3HrsData] = useState([]);
  const controller = new AbortController();
  const signal = controller.signal;
  // const [searchButtonClicked, setSearchButtonClicked] = useState(false);
  const htmlElement = document.querySelector('html');
                      htmlElement.setAttribute('data-bs-theme', darkMode? 'dark':'light');
  const openWeatherMap_key = import.meta.env.VITE_SECRET_KEY;

  function hangleModeClick(mode) {
   
    setDarkMode(mode)
    // console.log(mode)
  }

  function handleInputValue(state) {
    setInput(state);
  }

  async function APIcall(params) {
    try {
      const locationResponse = await axios({
        method: 'GET',
        url: `http://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=5&appid=${openWeatherMap_key}`,
      });
      
      const latitude = locationResponse.data[0].lat;
      const longitude = locationResponse.data[0].lon;
      const state = locationResponse.data[0].state;
      const country = locationResponse.data[0].country;
      setState(state)
      const result = await axios ({
          
                method: 'POST',
                url: 'http://localhost:3001/filter',
                data: ({
                    country: country
                })
            });
    // console.log(latitude, longitude, state, country, result.data);
    setCountry(result.data);
    const currentWeatherResponse = await axios ({
      method: 'GET',
      url: `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${openWeatherMap_key}`,
    }, {signal});
  // console.log(latitude, longitude)
  // console.log(currentWeatherResponse.data);
  setWeatherData(currentWeatherResponse.data)
    

  const forcast = await axios({
      method: "GET",
      url: `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${openWeatherMap_key}`
    },{signal});

  // console.log(forcast.data.list);
  
  setWeather3HrsData(forcast.data.list)
} catch (error) {
  console.error('Error sending data:', error);
}
  }

  async function handleSearchButtonClicked(params) {
    // setSearchButtonClicked(params)
    console.log(params)
    APIcall();
  }
  
  function CreateWeatherCard(params) {
    // console.log(params)
    return(
      <HourlyForcast 
        data={params}/>
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