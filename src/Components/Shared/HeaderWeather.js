import React, { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { WEATHER_QUERY } from "../../Graphql/Weather/query";

import styled from "styled-components";
import { color } from "../../styles";
import { FcDown, FcUp } from "react-icons/fc";
import { BsEmojiDizzy, BsEmojiFrown, BsEmojiHeartEyes, BsEmojiLaughing } from "react-icons/bs";
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
  //--날씨 위젯 컨트롤 부분--//
  const [seeWeather, setSeeWeather] = useState(false);
  const [firstEnter, setFirstEnter] = useState(true);

  const onClickWeatherBtn = () => {
    setSeeWeather((prev) => !prev);
    setFirstEnter(false);
  };
  //--날씨 위젯 컨트롤 부분--//

  //날씨 정보 불러오기 쿼리
  const [getWeather, { loading, error, data }] = useLazyQuery(WEATHER_QUERY);

  //위치 정보 수신 성공 시
  function handleGeoSuccess(position) {
    getWeather({ variables: { lat: position.coords.latitude, lng: position.coords.longitude } });
  }

  //위치 정보 수신 거부 시
  function handleGeoError() {
    console.log("위치 정보 없음");
    window.alert(
      "위치 정보 제공을 거부하였습니다.\n날씨 정보 수신을 원한다면 위치 정보 제공에 동의해주십시오.\n(설정 - 개인정보 및 보안 - 사이트 설정 - 위치 정보 제공 동의)"
    );
  }

  //좌표 수집 함수
  function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
  }

  //첫 렌더링 시 좌표 수집
  useEffect(askForCoords, [askForCoords]);

  return (
    <Weather>
      <WeatherBtn onClick={onClickWeatherBtn} seeWeather={seeWeather} firstEnter={firstEnter}>
        {seeWeather ? <FcUp /> : <FcDown />}
      </WeatherBtn>
      <WeatherContent seeWeather={seeWeather} firstEnter={firstEnter}>
        {loading ? (
          "날씨 정보 수신 중..."
        ) : error ? (
          error.message
        ) : data ? (
          <WeatherItems>
            <Temp>{Math.round(data.weather.temp)}℃</Temp>
            <WeatherIcon src={require(`../../image/icons/weather/${data.weather.icon}.svg`).default} />
            <Dust>미세먼지</Dust>
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
          "위치 정보 없음"
        )}
      </WeatherContent>
    </Weather>
  );
};

export default HeaderWeather;
