import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import useMedia from "../../Hooks/useMedia";
import IcFamilyMonth from "../../icons/FamilyMonth/FamilyMonth";
import routes from "../../routes";
import { customMedia } from "../../styles";
import { FamilyMonthLink } from "../Menu/MenuLink";
import DDayContents from "./DDAYContents";
import LinkContents from "./LinkContents";

const Container = styled.div`
  max-height: 100%;
  min-height: 100%;
  display: grid;
  row-gap: 20px;
  row-gap: 1.25rem;
  ${customMedia.greaterThan("tablet")`
    grid-template-rows: 1fr 1fr;
  `}
  position: relative;
`;

const EventBtn = styled.div`
  position: absolute;
  right: 0;
  svg {
    font-size: 2.5em;
    font-size: 2.5rem;
  }
  a {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    column-gap: 5px;
    column-gap: 0.3125rem;
  }
`;

const Text = styled.div`
  display: grid;
  justify-self: flex-end;
  div {
    text-align: end;
    line-height: 120%;
  }
`;

const HomeSection = ({
  dDay,
  userEmail,
  isMoveDDay,
  setMsg,
  setErrMsg,
  links,
  setLinks,
  userId,
}) => {
  const media = useMedia();
  return (
    <Container>
      <DDayContents
        dDay={dDay}
        userEmail={userEmail}
        isMoveDDay={isMoveDDay}
        setMsg={setMsg}
        setErrMsg={setErrMsg}
        userId={userId}
      />
      {media !== "Mobile" && (
        <LinkContents
          links={links}
          setLinks={setLinks}
          setMsg={setMsg}
          setErrMsg={setErrMsg}
          userEmail={userEmail}
          userId={userId}
        />
      )}
      <EventBtn>
        <Link to={`${routes.familyMonth}`}>
          <Text>
            <div style={{ color: "#F7658E", fontWeight: "600" }}>가정의 달</div>
            <div style={{ opacity: "0.8" }}>자료 공유 이벤트</div>
          </Text>
          <IcFamilyMonth />
        </Link>
      </EventBtn>
    </Container>
  );
};

export default HomeSection;
