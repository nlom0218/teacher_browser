import React from "react";
import styled from "styled-components";
import { customMedia } from "../../styles";
import {
  ListLink,
  DrawLink,
  JournalLink,
  LunchmenuLink,
  OrderLink,
  ScheduleLink,
  SwapLink,
  TimerLink,
  NewsLink,
} from "./MenuLink";

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 60px;
  row-gap: 3.75rem;
  column-gap: 30px;
  column-gap: 1.875rem;
  align-content: flex-start;
  justify-items: center;
  ${customMedia.greaterThan("tablet")`
    grid-template-columns: 1fr 1fr 1fr;
  `}
  ${customMedia.greaterThan("desktop")`
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  `}
`;

const SMenu = styled.div`
  display: grid;
  grid-template-rows: auto auto;
  row-gap: 10px;
  row-gap: 0.625rem;
  color: ${(props) => props.theme.fontColor};
  transition: color 1s ease;
  cursor: pointer;
  img {
    margin: 0 auto;
  }
  svg {
    margin: 0 auto;
    font-size: 2.5em;
    font-size: 2.5rem;
  }
`;

const Title = styled.div`
  font-weight: 600;
  text-align: center;
`;

const GridType = ({ onClickLunchmenu }) => {
  return (
    <Container>
      <TimerLink />
      <DrawLink />
      <SwapLink />
      <OrderLink />
      <LunchmenuLink onClickLunchmenu={onClickLunchmenu} />
      <ScheduleLink />
      <JournalLink />
      <ListLink />
      <NewsLink />
    </Container>
  );
};

export default GridType;
