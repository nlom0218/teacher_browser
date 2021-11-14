import React, { useState } from 'react';
import styled from 'styled-components';
import useMedia from '../Hooks/useMedia';
import { customMedia } from '../styles';
import { FcNews, FcCalendar, FcTodoList, FcGrid, FcBookmark, FcDown, FcUp } from "react-icons/fc";

const Container = styled.div`
  width: 100%;
  display: grid;
  padding: 20px;
  padding: 1.25rem;
  row-gap: 10px;
  row-gap: 0.625rem;
  ${customMedia.greaterThan("tablet")`
    grid-template-columns: 1fr 1fr 1fr;
    align-items: flex-start;
  `}
`

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
  background: #e8e8e8;
  border-radius: 50%;
  transition: background 1s ease;
`

const WeatherContent = styled.div`
  position: absolute;
  top: -36px;
  top: -2.25rem;
  background: ${props => props.theme.bgColor};
  transition: background 1s ease;
  padding: 10px 20px;
  padding: 0.625rem 1.25rem;
  border-radius: 10px;
  border-radius: 0.625rem;
`

const Header = () => {
  const [seeWeather, setSeeWeather] = useState(false)
  const [firstEnter, setFirstEnter] = useState(true)
  const onClickWeatherBtn = () => {
    setSeeWeather(prev => !prev)
    setFirstEnter(false)
  }
  const media = useMedia()
  return (<Container>
    {media !== "Mobile" &&
      <Weather>
        <WeatherBtn onClick={onClickWeatherBtn} seeWeather={seeWeather} firstEnter={firstEnter}>
          {seeWeather ? <FcUp /> : <FcDown />}
        </WeatherBtn>
        <WeatherContent seeWeather={seeWeather} firstEnter={firstEnter}>
          춘천시 4˚ 흐림 미세먼지 좋음
        </WeatherContent>
      </Weather>
    }
  </Container>);
}

export default Header;