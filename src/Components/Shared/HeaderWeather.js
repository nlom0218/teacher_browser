import React, { useState, useEffect, useCallback } from "react";
import { useLazyQuery } from "@apollo/client";
import { WEATHER_QUERY } from "../../Graphql/Weather/query";

import styled from "styled-components";
import { color } from "../../styles";
import { FcDown, FcUp } from "react-icons/fc";
import IcDustGood from "../../icons/Dust/IcDustGood";
import IcDustSoso from "../../icons/Dust/IcDustSoso";
import IcDustBad from "../../icons/Dust/IcDustBad";
import IcDustVeryBad from "../../icons/Dust/IcDustVeryBad";
import { weatherBtnDown, weatherBtnUp, weatherDown, weatherUp } from "../../Animations/WeatherAni";

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
  animation: ${(props) => (props.firstEnter ? "none" : props.seeWeather ? weatherBtnDown : weatherBtnUp)} 1s ease forwards;
  background: ${color.white};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5;
`;

const WeatherContent = styled.div`
  position: absolute;
  top: -30px;
  top: -1.875rem;
  left: 20px;
  left: 1.25rem;
  background: ${(props) => props.theme.blurColor};
  transition: background 1s ease;
  padding: 10px 20px;
  padding: 0.625rem 1.25rem;
  border-radius: 10px;
  border-radius: 0.625rem;
  animation: ${(props) => (props.firstEnter ? "none" : props.seeWeather ? weatherDown : weatherUp)} 1s ease forwards;
  svg {
  }
`;

const WeatherItems = styled.div`
  display: grid;
  grid-template-columns: repeat(7, auto);
  align-items: center;
`;

const Temp = styled.div``;

const WeatherIcon = styled.img`
  vertical-align: middle;
  margin: -20px 5px;
  transform: translate(0%, -5%);
  width: 25px;
  height: 25px;
`;

const Dust = styled.div``;

const DustIcon = styled.div`
  display: flex;
  margin: 0px 5px;
  margin: 0px 0.3125rem;
`;

const Address = styled.div`
  margin-left: 5px;
  margin: 0px 0.3125rem;
`;

//
const HeaderWeather = () => {
  //--?????? ?????? ????????? ??????--//
  const [seeWeather, setSeeWeather] = useState(false);
  const [firstEnter, setFirstEnter] = useState(true);

  const onClickWeatherBtn = () => {
    setSeeWeather((prev) => !prev);
    setFirstEnter(false);
  };
  //--?????? ?????? ????????? ??????--//

  //?????? ?????? ???????????? ??????
  const [getWeather, { loading, error, data }] = useLazyQuery(WEATHER_QUERY);

  //?????? ?????? ?????? ?????? ???
  const handleGeoSuccess = useCallback((position) => getWeather({ variables: { lat: position.coords.latitude, lng: position.coords.longitude } }), [getWeather]);

  //?????? ?????? ?????? ?????? ???
  function handleGeoError() {
    console.log("?????? ?????? ??????");
    window.alert("?????? ?????? ????????? ?????????????????????.\n?????? ?????? ????????? ???????????? ?????? ?????? ????????? ?????????????????????.\n(?????? - ???????????? ??? ?????? - ????????? ?????? - ?????? ?????? ?????? ??????)");
  }

  //?????? ?????? ??????
  function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
  }

  //??? ????????? ??? ?????? ??????
  useEffect(askForCoords, [handleGeoSuccess]);

  return (
    <Weather>
      <WeatherBtn onClick={onClickWeatherBtn} seeWeather={seeWeather} firstEnter={firstEnter}>
        {seeWeather ? <FcUp /> : <FcDown />}
      </WeatherBtn>
      <WeatherContent seeWeather={seeWeather} firstEnter={firstEnter}>
        {loading ? (
          "?????? ?????? ?????? ???..."
        ) : error ? (
          error.message
        ) : data ? (
          <WeatherItems>
            <Temp>{Math.round(data.weather.temp)}???</Temp>
            <WeatherIcon src={require(`./../../image/icons/weather/${data.weather.icon}.png`)} />
            <Dust>????????????</Dust>
            <DustIcon>
              {data.weather.pm10grade === "1" ? (
                <IcDustGood />
              ) : data.weather.pm10grade === "2" ? (
                <IcDustSoso />
              ) : data.weather.pm10grade === "3" ? (
                <IcDustBad />
              ) : data.weather.pm10grade === "4" ? (
                <IcDustVeryBad />
              ) : (
                ""
              )}
            </DustIcon>
            <div>@</div>
            <Address>{data.weather.address1 + " " + data.weather.address2}</Address>
          </WeatherItems>
        ) : (
          "?????? ?????? ??????"
        )}
      </WeatherContent>
    </Weather>
  );
};

export default HeaderWeather;
