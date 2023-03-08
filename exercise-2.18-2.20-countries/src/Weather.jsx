import axios from "axios";
import { useState, useEffect } from "react";

const Weather = ({ country }) => {
  const [info, setInfo] = useState({});
  const [errorMsg, setErrorMsg] = useState("");

  const apiKey = import.meta.env.VITE_APP_API_TOKEN;
  const baseUrl = `https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${apiKey}`;

  useEffect(() => {
    axios
      .get(baseUrl)
      .then((response) => {
        setInfo(response.data);
        setErrorMsg("");
      })
      .catch((err) => setErrorMsg(err));
  }, []);

  const temp = info.main && (info.main.temp - 273.15).toFixed(2);
  const icon = info.weather && info.weather[0].icon;
  const speed = info.wind && info.wind.speed;

  return (
    <div>
      {speed ? (
        <div>
          <h2>Weather in {country}</h2>
          <p>Temperature: {temp} Celcius</p>
          <img
            src={`https://openweathermap.org/img/wn/${icon}.png`}
            alt={icon}
            width="100px"
          />
          <p>Wind: {speed} m/s</p>
        </div>
      ) : errorMsg ? (
        <div>Sorry, data not available.</div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Weather;
