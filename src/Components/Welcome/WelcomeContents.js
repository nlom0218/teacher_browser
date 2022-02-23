import React from 'react';
import styled from 'styled-components';
import { customMedia } from '../../styles';

const Container = styled.div`
  display: grid;
  row-gap: 20px;
  row-gap: 1.25rem;
`

const MsgContainer = styled.div`
  display: grid;
  row-gap: 10px;
  row-gap: 0.625rem;
`

const Msg = styled.div`
  line-height: 120%;
`

const LinkContainer = styled.div`
  display: grid;
  row-gap: 20px;
  row-gap: 1.25rem;
`

const LinkLayout = styled.div`
  display: grid;
  align-items: center;
  column-gap: 20px;
  column-gap: 1.25rem;
  row-gap: 10px;
  row-gap: 0.625rem;
  justify-items: center;
  ${customMedia.greaterThan("desktop")`
    grid-template-columns: auto 1fr;
  `}
`

const Title = styled.div`
  padding: 10px 20px;
  padding: 0.625rem 1.25rem;
  background-color: ${props => props.theme.green};
  color: ${props => props.theme.bgColor};
  border-radius: 5px;
  border-radius: 0.3125rem;
  text-align: center;
  line-height: 160%;
`

const Link = styled.div`
  justify-self: center;
  cursor: pointer;
  text-decoration: underline;
  ${customMedia.greaterThan("desktop")`
      justify-self: flex-start;
  `}
`

const WelcomeContents = () => {
  return (<Container>
    <MsgContainer>
      <Msg>체험단 여러분 반갑습니다!</Msg>
      <Msg>2월 24일 부터 2월 28일까지 5일동안 티처캔을 이용하시면서 다양한 의견과 피드백을 주시면 더욱 멋진 모습으로 3월 1일에 찾아뵙겠습니다! 😊</Msg>
    </MsgContainer>
    <LinkContainer>
      <LinkLayout>
        <Title>24일~25일은 자유롭게 구경 및 티처캔 활용하기</Title>
        <Link onClick={() => window.open("https://www.notion.so/123b3c79689f41dfa8469f833bc345b0")}>해당 노션 페이지로 바로가기</Link>
      </LinkLayout>
      <LinkLayout>
        <Title>26일~28일은 오류 찾기 및 피드백이 필요한 부분 자유롭게 의견 남기기</Title>
        <Link onClick={() => window.open("https://www.notion.so/bd7a84f42e04495f9557b14fb57b6274")}>해당 노션 페이지로 바로가기</Link>
      </LinkLayout>
    </LinkContainer>
  </Container>);
}

export default WelcomeContents;