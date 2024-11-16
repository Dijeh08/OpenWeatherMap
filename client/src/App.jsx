import React, { useEffect, useState } from 'react';
import Header from './components/Header'
import './App.css';
import axios from 'axios';
import CurrentForcast from './components/CurrentForcast';
import HourlyForcast from './components/HourlyForcast';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Footer from './components/footer';

function App() {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [backgroundColor, setBackgroundColor] = useState(false);
  const [state, setState] = useState(null);
  const [country, setCountry] = useState(null);
  const [input, setInput] = useState(null);
  // const [apiState, setApiState] = useState(false)
  const [weatherData, setWeatherData] = useState(null);
  const [weather3HrsData, setWeather3HrsData] = useState([]);
  const [isThereLongitudeAndLatitudeData, setThereLongitudeAndLatitudeData] = useState(false)
  const controller = new AbortController();
  const signal = controller.signal;
  

  function handleBackgroundColor() {
   
    setBackgroundColor(!backgroundColor)
  }

  function handleLatitude(params) {
    // console.log(`Thats is the lat ${params}`)
    setLatitude(params);
  }

  function handleLongitude(params) {
    // console.log(`Thats is the lon ${params}`)
    setLongitude(params);
    setThereLongitudeAndLatitudeData(true)
  }

  useEffect(() => {
  
        // console.log('me')
        const fetchAPI = async (req, res) =>{
          try {
            const response = await axios ({
              method: 'GET',
              url: `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${import.meta.env.VITE_SECRET_KEY}`,
            }, {signal});
            
          // console.log(response.data);
          setWeatherData(response.data)
          } catch (error) {
            console.log(error)
          } 
        }

    fetchAPI();
  }, [ isThereLongitudeAndLatitudeData]);

  function handleState(state) {
    // console.log(state);
    setState(state);
  }

  function handleCountry(state) {
    // console.log(state);
    setCountry(state);
  }

  function handleInputValue(state) {
    // console.log(state);
    setInput(state);
  }

  async function handle3HrAPICall (params) {
    try {
       
        const response = await axios({
            method: "GET",
            url: `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${import.meta.env.VITE_SECRET_KEY}`
        },{signal});

        // console.log(response.data.list);
        
        setWeather3HrsData(response.data.list)
    } catch (error) {
        console.log(error)
    }
     
}
useEffect(() =>{
  handle3HrAPICall();
  return(() => {
    controller.abort();
    console.log(controller.signal)
  })
},[])

  
  function CreateWeatherCard(params) {
    // console.log(params)
    return(
      <HourlyForcast 
        data={params}/>
    )
  }
  return(
    <>
    
      <div className={backgroundColor? 'whiteBackground': 'blackBackground'}>
          <Header 
          background={handleBackgroundColor}
          long={handleLongitude}
          latt={handleLatitude}
          state={handleState}
          country={handleCountry}
          inputValue={handleInputValue}/>
      </div>
      
      <div className={backgroundColor? 'whiteBackground container': 'blackBackground container'} style={{marginTop: '5px'}}>
          <CurrentForcast
            data={weatherData}
            state={state}
            country={country}
            input={input}/>
      </div>
      <div className={backgroundColor? 'whiteBackground container ': 'blackBackground container'}>
        <div className='text-center'><h3>5 Day/ 3 HOUR FORCAST</h3></div>
        <div className='overflow-x-scroll d-flex'>
          {weather3HrsData.map(CreateWeatherCard)}
        </div>
        
        
      </div>

      <Footer/>

    </>
  )
}
export default App;