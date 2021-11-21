import React, { useState } from 'react';
import styled from 'styled-components';
import { FcDown, FcUp } from "react-icons/fc";
import { weatherBtnDown, weatherBtnUp, weatherDown, weatherUp } from '../../Animations/WeatherAni';
import { color } from '../../styles';

const Weather = styled.div`
  
`

const WeatherBtn = styled.div`
  position: absolute;
  top: 20px;
  top: 1.25rem;
  left: 20px;
  left: 1.25rem;
  cursor: pointer;
  font-size: 1.5em;
  font-size: 1.5rem;
  animation: ${props => props.firstEnter ? "none" : props.seeWeather ? weatherBtnDown : weatherBtnUp} 1s ease forwards;
  background: ${color.white};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const WeatherContent = styled.div`
  position: absolute;
  top: -30px;
  top: -1.875rem;
  background: ${props => props.theme.blurColor};
  transition: background 1s ease;
  padding: 10px 20px;
  padding: 0.625rem 1.25rem;
  border-radius: 10px;
  border-radius: 0.625rem;
  animation: ${props => props.firstEnter ? "none" : props.seeWeather ? weatherDown : weatherUp} 1s ease forwards;
`

const HeaderWeather = () => {
  const [seeWeather, setSeeWeather] = useState(false)
  const [firstEnter, setFirstEnter] = useState(true)
  const onClickWeatherBtn = () => {
    setSeeWeather(prev => !prev)
    setFirstEnter(false)
  }
  return (<Weather>
    <WeatherBtn onClick={onClickWeatherBtn} seeWeather={seeWeather} firstEnter={firstEnter}>
      {seeWeather ? <FcUp /> : <FcDown />}
    </WeatherBtn>
    <WeatherContent seeWeather={seeWeather} firstEnter={firstEnter}>
      춘천시 4˚ 흐림 미세먼지 좋음
    </WeatherContent>
  </Weather>);
}

export default HeaderWeather;