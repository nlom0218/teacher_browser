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
