import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const Weather = ({showPage,setShowPage,isBackground}) => {
  const [ weather, setWeather ] = useState({});
  const cloid = weather.weather?.[0].icon;
  const [timer, setTimer] = useState(0);
  const [ indexD, setIndexD ] = useState('d');
  const [isCelsius, setIsCelsius] = useState(false);
  const disi = [showPage ? "show-weather" : "hiden",isBackground ? "font-yes" : "font-no" ]

  const changeDegrees = () => {
    setIsCelsius(!isCelsius);
  }

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
        .then((res) => setWeather(res.data))
      
    }
    navigator.geolocation.getCurrentPosition(succes);
  }, [] );

  document.body.style = isBackground? `background-image: url(https://github.com/CciClo/weatherOpen/raw/main/weatherOpen/${cloid}.gif)`: "background-color: rgba(0, 0, 0 , 0.98)";

  return (
    <div className={`${disi[0]} ${disi[1]}`}>
      <div className={indexD} >
        <label htmlFor=""><h2>City:</h2>{weather.name}, {weather.sys?.country}</label>
        <label htmlFor=""><h3>Wind Speed:</h3>{weather.wind?.speed} m/s</label>
        <label htmlFor=""><h3>Clouds:</h3>{weather.clouds?.all}%</label>
        <label htmlFor=""><h3>Pressure:</h3>{weather.main?.pressure} mb</label>
        <label htmlFor=""><h3>{isCelsius ? (weather.main?.temp-32)*5/9:weather.main?.temp}</h3>{isCelsius? "°C":"°F"}</label>
        <br />
        <button onClick={changeDegrees}>{isCelsius? "switch to Fahrenheit degrees" : "switch to Celsius degrees"}</button>
      </div>
      <div>
        <h3>"{weather.weather?.[0].description}"</h3>
        <img src={`http://openweathermap.org/img/wn/${cloid}@2x.png`} alt="" />
      </div>
    </div>
  );
};

export default Weather;