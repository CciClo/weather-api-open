import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const Weather = ({showPage,setShowPage,isBackground}) => {
  const [ weather, setWeather ] = useState({});
  const cloid = weather.weather?.[0].icon;
  const temp = (weather.main?.temp - 273.15) * 9/5 + 32;
  const [timer, setTimer] = useState(0);
  const [ indexD, setIndexD ] = useState('d');
  const [isCelsius, setIsCelsius] = useState(true);
  const disi = [showPage ? "show-weather" : "hiden",isBackground ? "font-yes" : "font-no" ]

  const changeDegrees = () => {
    setIsCelsius(!isCelsius);
  }

  // const changeShowPage = () =>{
  //   setShowPage(true)
  //   setIndexD(cloid[cloid.length-1])
  //   console.log(cloid)
  // };
  useEffect(() => {
    setTimer(timer+1)
    if (timer == 1){
      setShowPage(true)
      setIndexD(cloid[cloid.length-1])
    }    
  },[weather]);


  useEffect(() => {
    const succes = (pos) =>{
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      const apiKey = "2f346c31b213811ac52cc3ce1d7d05c7";
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)
        .then((res) => {
          setWeather(res.data)
          // changeShowPage();
        })
      
    }
    navigator.geolocation.getCurrentPosition(succes);
  }, [] );

  document.body.style = isBackground? `background-image: url(https://github.com/CciClo/weatherOpen/raw/main/weatherOpen/${cloid}.gif)`: `${indexD==="d"?  'background: rgb(131,58,180); background: linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 46%, rgba(252,176,69,1) 85%)' : 'background-color: #4B4453'}`;

  return (
    <div className={`${disi[0]} ${disi[1]} ${indexD}`}>
      <h3 className='city'>{weather.name}, {weather.sys?.country}</h3>
      <div>
        <h3>Wind Speed: {weather.wind?.speed} m/s</h3>
        <h3>Clouds: {weather.clouds?.all}%</h3>
        <h3>Pressure: {weather.main?.pressure} mb</h3>
        <br />
        <button onClick={changeDegrees}>{isCelsius? "switch to Fahrenheit degrees" : "switch to Celsius degrees"}</button>
      </div>
      <div className='temp'>
        <h3>"{weather.weather?.[0].description}"</h3>
        <div>
          <img src={`http://openweathermap.org/img/wn/${cloid}@2x.png`} alt="" />
          <h3>{isCelsius ? Math.floor((temp-32)*5/9) : Math.floor(temp)} {isCelsius? "°C":"°F"}</h3>
        </div>
      </div>
    </div>
  );
};

export default Weather;