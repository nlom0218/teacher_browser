// 데스크탑 상황일 때 왼쪽과 오른쪽 화면을 구분하면 스크롤을 하고 싶은 곳

import styled from "styled-components";
import { FadeInBtn, FadeInList, FadeOutBtn, FadeOutList } from "../../../Animations/StudentListAni";
import { color, customMedia } from "../../../styles";

export const DivideLeftContents = styled.div`
  max-height: 100%;
  min-height: 100%;
  padding: 20px;
  padding: 1.25rem;
  position: absolute;
    top: 0;
    left: 0;
    bottom:0;
    width: 100%;
    overflow: scroll;
    -ms-overflow-style: none; // IE and Edge
    scrollbar-width: none; // Firefox
    ::-webkit-scrollbar {
      display: none; // Chrome, Safari, Opera
    }
  ${customMedia.greaterThan("desktop")`
    padding: 40px;
    padding: 2.5rem;
    width: ${props => props.isSeeList ? "75%" : "100%"};
    transition: width 1s ease;
 

  `}
`

export const DivideRightContents = styled.div`
  position: absolute;
  right: ${props => props.isSeeList ? "1%" : "-24%"};
  animation: 1s ease forwards ${props => !props.initLoad && (props.isSeeList ? FadeInList : FadeOutList)};
  top: 2%;
  width: 24%;
  height: 96%;
  min-height: 96%;
  padding: 20px;
  padding: 1.25rem;
  display: ${props => props.isSeedisplay ? "grid" : "none"};
  grid-template-rows: 1fr auto;
  row-gap: 20px;
  row-gap: 1.25rem;
  background-color: ${props => props.theme.bgColor};
  transition: background-color 1s ease;
  border-radius: 5px;
  border-radius: 0.3125rem;
  box-shadow: ${color.boxShadow};
  z-index: 5;
`

export const SeeRightContentsBtn = styled.div`
  cursor: pointer;
  position: absolute;
  top: 2%;
  right: ${props => props.isSeeList ? "26%" : "1%"};
  animation: 1s ease forwards ${props => !props.initLoad && (props.isSeeList ? FadeInBtn : FadeOutBtn)};
  padding: 10px;
  border-radius: 50%;
  background-color: ${props => props.theme.bgColor};
  transition: background-color 1s ease;
  svg {
    display: flex; 
  }
`