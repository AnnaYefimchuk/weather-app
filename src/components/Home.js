import { useState } from 'react';
import './Home.css';
import thermometer from '../img/thermometerWshed.png';
import windW from '../img/wind1.png';

const api = {
  key: 'ef9442a94896761aa1cf42acc85232ed',
  base: 'https://api.openweathermap.org/data/2.5/',
}

export default function Home() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
        });
    }
  }

  let currentDate = new Date().toLocaleDateString();

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
      <main>
        <div className="searchBox">
          <input
            type="text"
            className="searchBar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="locationBox">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{currentDate}</div>
            </div>
            <div className="weatherBox">
              <div className="temp">
                <section>{Math.round(weather.main.temp)}</section>
                <img className="imgThermometer" src={thermometer} alt="search" />
              </div>
              <div className="weather">
                <section>{weather.weather[0].description}</section>
                <img className="imgSearch" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="search" />
              </div>
              <div className="weather">
                <img className="imgSearch" src={windW} alt="search" />
                <section>{weather.wind.speed} m/s</section>
                </div>
            </div>
          </div>
        ) : ('')}
      </main>
    </div>
  );

}