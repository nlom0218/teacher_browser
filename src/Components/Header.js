import React, { useState } from 'react';
import styled from 'styled-components';
import useMedia from '../Hooks/useMedia';
import { color, customMedia } from '../styles';
import { FcNews, FcCalendar, FcTodoList, FcGrid, FcBookmark, FcDown, FcUp } from "react-icons/fc";
import { weatherBtnDown, weatherBtnUp, weatherDown, weatherUp } from '../Animations/WeatherAni';
import { Link } from 'react-router-dom';
import routes from '../routes';

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
  animation: ${props => props.firstEnter ? "none" : props.seeWeather ? weatherBtnDown : weatherBtnUp} 1s ease forwards;
  svg {
    background: ${color.white};
    border-radius: 50%;
  }
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

const PageBtn = styled.div``

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
    <PageBtn>
      <Link to={routes.home}><FcNews /></Link>
      <Link to={routes.todo}><FcTodoList /></Link>
      <Link to={routes.calendar}><FcCalendar /></Link>
      <Link to={routes.pageLink}><FcBookmark /></Link>
      <Link to={routes.menu}><FcGrid /></Link>
    </PageBtn>
  </Container>);
}

export default Header;