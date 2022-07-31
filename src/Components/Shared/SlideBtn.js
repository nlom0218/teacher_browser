import React, { useState } from "react";
import styled from "styled-components";
import { ToLeft, ToRight } from "../../Animations/MenuBtn";
import { disableDarkMode, enableDarkMode } from "../../apollo";

const Cotainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-radius: 20px;
  border-radius: 1.25rem;
  background-color: ${(props) => props.theme.bgColor};
  transition: background-color 1s ease;
  position: relative;
  svg {
    font-size: 1.25em;
    font-size: 1.25rem;
  }
`;

const Btn = styled.div`
  cursor: pointer;
  padding: 5px 10px;
  padding: 0.3125rem 0.625rem;
  opacity: 0.8;
  text-align: center;
`;

const SlideBtnBackground = styled.div`
  position: absolute;
  left: 0;
  padding: 5px 10px;
  padding: 0.3125rem 0.625rem;
  border-radius: 20px;
  border-radius: 1.25rem;
  background-color: ${(props) => props.theme.btnBgColor};
  color: ${(props) => props.theme.bgColor};
  transition: background-color 1s ease, color 1s ease;
  cursor: pointer;
  animation: ${(props) => (props.typeAniInit ? "none" : props.state === props.leftContents ? ToLeft : ToRight)} 1s ease
    forwards;
  transform: ${(props) =>
    props.typeAniInit && props.state === props.leftContents ? "translateX(0%)" : "translateX(100%)"};
`;

const SlideBtn = ({ state, setState, leftContents, rigthContents, leftIcon, rigthIcon, darkMode }) => {
  const [typeAniInit, setTypeAniInit] = useState(true);
  const onClickHomeBtn = () => {
    if (state === leftContents) {
      if (darkMode) {
        disableDarkMode();
      } else {
        setState(rigthContents);
      }
    } else {
      if (darkMode) {
        enableDarkMode();
      } else {
        setState(leftContents);
      }
    }
    setTypeAniInit(false);
    setTimeout(() => {
      setTypeAniInit(true);
    }, 1000);
  };
  return (
    <Cotainer>
      <Btn onClick={onClickHomeBtn}>{leftIcon}</Btn>
      <Btn onClick={onClickHomeBtn}>{rigthIcon}</Btn>
      <SlideBtnBackground state={state} onClick={onClickHomeBtn} typeAniInit={typeAniInit} leftContents={leftContents}>
        {state === leftContents ? <div>{leftIcon}</div> : <div>{rigthIcon}</div>}
      </SlideBtnBackground>
    </Cotainer>
  );
};

export default SlideBtn;
