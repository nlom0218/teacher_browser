import React from "react";
import { useParams } from "react-router-dom";
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
  PopupOrderLink,
  QrcodeLink,
  HeaderBookMark,
  PopupLunchmenuLink,
  PopupQrcodeLink,
  PopupDrawLink,
  RolesLink,
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
  const { type } = useParams();
  return (
    <Container>
      {type === "newWindow" ? (
        <React.Fragment>
          <TimerLink />
          <PopupLunchmenuLink />
          <PopupQrcodeLink />
          <PopupOrderLink />
          <PopupDrawLink />
          <RolesLink />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <TimerLink />
          <DrawLink />
          <SwapLink />
          <OrderLink />
          <LunchmenuLink />
          <ScheduleLink />
          <JournalLink />
          <ListLink />
          <RolesLink />
          <NewsLink />
          <HeaderBookMark />
          <QrcodeLink />
        </React.Fragment>
      )}
    </Container>
  );
};

export default GridType;
