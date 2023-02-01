import React from "react";
import styled from "styled-components";
import { customMedia } from "../../styles";
import {
  DrawLink,
  JournalLink,
  ListLink,
  LunchmenuLink,
  NewsLink,
  OrderLink,
  ScheduleLink,
  SwapLink,
  TimerLink,
  ManagingRolesLink,
  QrcodeLink,
  XmasTree,
  RolesLink,
} from "./MenuLink";

const Container = styled.div`
  display: grid;
  row-gap: 40px;
  row-gap: 2.5rem;
`;

const Theme = styled.div`
  display: grid;
  row-gap: 20px;
  row-gap: 1.25rem;
`;

const Title = styled.div`
  /* justify-self: center; */
  margin: 0px 40px;
  margin: 0rem 2.5rem;
  padding: 10px 0px;
  padding: 0.625rem 0rem;
  font-size: 1.25em;
  font-size: 1.25rem;
  opacity: 0.8;
  position: relative;
  ${customMedia.greaterThan("tablet")`
    justify-self: flex-start;
  `}
`;

const UnderLine = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: 2px;
  background-color: ${(props) => props.theme.fontColor};
  opacity: 0.8;
  ${customMedia.greaterThan("tablet")`
    width: 100%;
  `}
`;

const PageLink = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 40px;
  row-gap: 2.5rem;
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

const ListType = ({ onClickLunchmenu }) => {
  return (
    <Container>
      <Theme>
        <Title>
          수업활용 도구 <UnderLine></UnderLine>
        </Title>
        <PageLink>
          <TimerLink />
          <DrawLink />
          <SwapLink />
          <OrderLink />
          <QrcodeLink />
          <RolesLink />
          {/* <ManagingRolesLink /> */}
        </PageLink>
      </Theme>
      <Theme>
        <Title>
          학교관련 정보 <UnderLine></UnderLine>
        </Title>
        <PageLink>
          <LunchmenuLink onClickLunchmenu={onClickLunchmenu} />
          <ScheduleLink />
        </PageLink>
      </Theme>
      <Theme>
        <Title>
          학생관리 도구 <UnderLine></UnderLine>
        </Title>
        <PageLink>
          <JournalLink />
          <ListLink />
        </PageLink>
      </Theme>
      <Theme>
        <Title>
          기타 메뉴 <UnderLine></UnderLine>
        </Title>
        <PageLink>
          <NewsLink />
          <XmasTree />
        </PageLink>
      </Theme>
    </Container>
  );
};

export default ListType;
