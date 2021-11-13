import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { useReactiveVar } from '@apollo/client';
import { darkModeVar, disableDarkMode, enableDarkMode } from '../apollo';

const Wrapper = styled.div`
  position: fixed;
  bottom: 20px;
  bottom: 1.25rem;
  right: 20px;
  right: 1.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 10px;
  padding: 0.75rem 0.625rem;
  border-radius: 20px;
  border-radius: 1.25rem;
  box-shadow: 0px 2px 1px 0.5px rgba(0,0,0,0.2);
  box-shadow: 0px 0.125rem 0.0625rem 0.03125rem rgba(0,0,0,0.2);
  background: ${props => props.theme.bgColor};
  transition: none;
  font-size: 0.75em;
  font-size: 0.75rem;
  :hover {
    background: ${props => props.theme.fontColor};
    color: ${props => props.theme.bgColor};
  }
`

const LightNav = styled.div`
  cursor: pointer;
  svg {
    color: tomato;
    margin-right: 5px;
    margin-right: 0.3125rem;
  }
`

const DarkNav = styled.div`
  cursor: pointer;
  svg {
    color: yellow;
    margin-right: 5px;
    margin-right: 0.3125rem;
  }
`

const Theme = () => {
  const darkMode = useReactiveVar(darkModeVar)
  const onCLickDarkMode = () => {
    disableDarkMode()
  }
  const onClickLightMode = () => {
    enableDarkMode()
  }

  return (
    <Wrapper>
      {darkMode ? <LightNav
        onClick={onCLickDarkMode}>
        <FontAwesomeIcon
          icon={faSun}
        /> 라이트 모드로 보기
      </LightNav> :
        <DarkNav
          onClick={onClickLightMode}>
          <FontAwesomeIcon
            icon={faMoon}
          /> 다크 모드로 보기
        </DarkNav>
      }
    </Wrapper>
  )
}

export default Theme;