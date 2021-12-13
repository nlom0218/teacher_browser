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
import dotenv from "dotenv";
dotenv.config();

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
  vertical-align: middle;
  margin-top: -20px;
  margin-bottom: -20px;
  transform: translate(0%, -5%);
`;

//
const HeaderWeather = () => {
  const [seeWeather, setSeeWeather] = useState(false);
  const [firstEnter, setFirstEnter] = useState(true);
  const [weather, setWeather] = useState(false);
  const [adress, setAdress] = useState();

  const onClickWeatherBtn = () => {
    setSeeWeather((prev) => !prev);
    setFirstEnter(false);
  };

  function getWeather(lat, lng) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=284ec2b148a72a61795ba16c7a6f7fbb`
    )
      .then((res) => res.json())
      .then((json) => {
        setWeather([json.main.temp, json.weather[0].icon]);
      });
  }

  function getAdress(lat, lng) {
    fetch(
      `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lng}&y=${lat}`,
      {
        method: "GET",
        headers: {
          Authorization: `KakaoAK 4ef1257f7d0ad8948de3bb5fec5617a5`,
        },
      }
    )
      .then((res) => res.json())
      .then((json) =>
        setAdress([
          json.documents[0].address.region_2depth_name,
          json.documents[0].address.region_3depth_name,
        ])
      );
  }

  function handleGeoSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
      latitude,
      longitude,
    };
    getAdress(coordsObj.latitude, coordsObj.longitude);
    getWeather(coordsObj.latitude, coordsObj.longitude);
  }

  function handleGeoError() {
    console.log("위치 정보 없음");
  }

  function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
  }

  useEffect(askForCoords, []);

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
        {weather && adress ? (
          <React.Fragment>
            {Math.round(weather[0])}℃
            <WeatherIcon
              src={`https://openweathermap.org/img/wn/${weather[1]}.png`}
            />
            @ {adress[0] + " " + adress[1]}
          </React.Fragment>
        ) : (
          "위치 정보 없음"
        )}
      </WeatherContent>
    </Weather>
  );
};

export default HeaderWeather;
