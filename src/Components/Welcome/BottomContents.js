import React from 'react';
import styled from 'styled-components';
import { customMedia } from '../../styles';

const Container = styled.div`
  display: grid;
  row-gap: 20px;
  row-gap: 1.25rem;
  ${customMedia.greaterThan("desktop")`
    grid-template-columns: 1fr 1fr 1fr;
  `}
`

const LayoutOne = styled.div`
  background-color: rgba(241, 113, 113, 0.4);
  box-shadow: rgb(0 0 0 / 20%) 0px 17px 6px -14px;
  display: grid;
  grid-template-rows: 1fr 1fr;
  padding: 20px;
  padding: 1.25rem;
`

const LayoutTwo = styled.div`
  background-color: rgb(139, 219, 41, 0.4);
  box-shadow: rgb(0 0 0 / 20%) 0px 17px 6px -14px;
  display: grid;
  grid-template-rows: 1fr 1fr;
  padding: 20px;
  padding: 1.25rem;
`

const Textarea = styled.div`
  align-self: center;
  display: grid;
  align-items: center;
  text-align: center;
  display: grid;
  row-gap: 10px;
  row-gap: 0.625rem;
  line-height: 160%;
`

const MainText = styled.div`
  font-size: 1.1em;
  font-size: 1.1rem;
  font-weight: 600;
`

const LayoutThree = styled.div`
  background-color: rgba(235, 151, 6, 0.4);
  box-shadow: rgb(0 0 0 / 20%) 0px 17px 6px -14px;
  display: grid;
  grid-template-rows: 1fr 1fr;
  padding: 20px;
  padding: 1.25rem;
`

const Btn = styled.div`
  cursor: pointer;
  align-self: center;
  justify-self: center;
  padding: 10px 20px;
  padding: 0.625rem 1.25rem;
  border: 1px solid ${porps => porps.theme.fontColor};
  transition: border 1s ease;
  :hover {
    background-color: ${props => props.theme.fontColor};
    color: ${props => props.theme.bgColor};
    transition: background-color 0.4s ease, color 0.4s ease;
  }
`

const SubText = styled.div`
  opacity: 0.8;
  text-align: center;
  div {
  :not(:last-child) {
    margin-bottom: 10px;
    margin-bottom: 0.625rem;
    }
  }
`

const BottomContents = () => {
  return (<Container>
    <LayoutOne>
      <Textarea>
        <MainText>티처캔이 처음이신가요?</MainText>
        <div>티처캔을 보다 잘 사용할 수 있는<br /> 방법을 알려드립니다. 😍</div>
      </Textarea>
      <Btn onClick={() => window.open("https://sparkly-corleggy-3e4.notion.site/718aaed6e5e54babb7efb97384bab836")}>설명서 바로가기</Btn>
    </LayoutOne>
    <LayoutTwo>
      <Textarea>
        <MainText>필요한 기능 및 오류가 있나요?</MainText>
        <div>소중한 의견을 적극 반영하여<br />꾸준히 발전하겠습니다. 🤩</div>
      </Textarea>
      <Btn onClick={() => window.open("https://docs.google.com/forms/d/e/1FAIpQLSebZY_Z3Rtt573TmQ_TIwme7heipIfgGFjSZx5eKl-0bH9F5g/viewform")}>설문지 작성하기</Btn>
    </LayoutTwo>
    <LayoutThree>
      <Textarea>
        <MainText>About 티처캔</MainText>
      </Textarea>
      <SubText>
        <div>티처캔 © 2022-2022</div>
        <div>version 1.2.0</div>
        <div>만든이 팀 초코</div>
      </SubText>
    </LayoutThree>
  </Container>);
}

export default BottomContents;