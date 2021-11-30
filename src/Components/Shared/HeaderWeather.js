import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FcDown, FcUp } from "react-icons/fc";
import {
  weatherBtnDown,
  weatherBtnUp,
  weatherDown,
  weatherUp,
} from "../../Animations/WeatherAni";
import { color } from "../../styles";

const Weather = styled.div``;

const WeatherBtn = styled.div`
  position: absolute;
  top: 20px;
  top: 1.25rem;
  left: 20px;
  left: 1.25rem;
  cursor: pointer;
  font-size: 1.5em;
  font-size: 1.5rem;
  animation: ${(props) =>
      props.firstEnter
        ? "none"
        : props.seeWeather
        ? weatherBtnDown
        : weatherBtnUp}
    1s ease forwards;
  background: ${color.white};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WeatherContent = styled.div`
  position: absolute;
  top: -30px;
  top: -1.875rem;
  background: ${(props) => props.theme.blurColor};
  transition: background 1s ease;
  padding: 10px 20px;
  padding: 0.625rem 1.25rem;
  border-radius: 10px;
  border-radius: 0.625rem;
  animation: ${(props) =>
      props.firstEnter ? "none" : props.seeWeather ? weatherDown : weatherUp}
    1s ease forwards;
`;

const WeatherIcon = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const HeaderWeather = () => {
  const [seeWeather, setSeeWeather] = useState(false);
  const [firstEnter, setFirstEnter] = useState(true);
  const onClickWeatherBtn = () => {
    setSeeWeather((prev) => !prev);
    setFirstEnter(false);
  };

  const API_KEY = "284ec2b148a72a61795ba16c7a6f7fbb";
  const [weatherData, setWeatherData] = useState(false);

  function getWeatherData() {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=seoul&units=metric&appid=${API_KEY}`
    )
      .then((res) => res.json())
      .then((json) => setWeatherData(json));
  }

  useEffect(getWeatherData, []);

  return (
    <Weather>
      <WeatherBtn
        onClick={onClickWeatherBtn}
        seeWeather={seeWeather}
        firstEnter={firstEnter}
      >
        {seeWeather ? <FcUp /> : <FcDown />}
      </WeatherBtn>
      <WeatherContent seeWeather={seeWeather} firstEnter={firstEnter}>
        {weatherData ? (
          <React.Fragment>
            서울시 {Math.round(weatherData.main.temp)}℃{" "}
            <WeatherIcon
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
            />
            미세먼지 정보없음
          </React.Fragment>
        ) : (
          "Loading"
        )}
      </WeatherContent>
    </Weather>
  );
};

export default HeaderWeather;
