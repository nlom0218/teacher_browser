import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { moveLinkPick, pageLinkFolderVar } from "../../apollo";
import {
  hideWelcomeSection,
  seeWelcomSection,
} from "../../Animations/WelcomeSectionAni";
import { FaArrowCircleRight } from "react-icons/fa";
import FolderList from "./FolderList";
import ContentsList from "./Styled/ContentsList";
import PageLinkTitle from "./Styled/PageLinkTitle";
import PageLinkList from "./Styled/PageLinkList";
import { useQuery, useReactiveVar } from "@apollo/client";
import { SEE_MY_PAGE_LINK_QUERY } from "../../Graphql/PageLink/query";
import MyPageLink from "./MyPageLink";
import { linkPickFolderVar } from "../../apollo";

const MoveContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: ${(props) => (props.pageLinkSection === "pageLink" ? 0 : "100%")};
  left: ${(props) => (props.pageLinkSection === "pageLink" ? 0 : "-100%")};
  animation: ${(props) =>
      !props.init &&
      (props.pageLinkSection === "pageLink"
        ? seeWelcomSection
        : hideWelcomeSection)}
    1s ease forwards;
  display: grid;
  row-gap: 20px;
  row-gap: 1.25rem;
`;
const MoveIcon = styled.div`
  position: absolute;
  top: 1%;
  right: 1%;
  z-index: 2;
  cursor: pointer;
  svg {
    display: flex;
    font-size: 1.5em;
    font-size: 1.5rem;
  }
`;

const PageLinkSection = ({ userEmail, pageLinkSection, init, setInit }) => {
  const [myPageLink, setMyPageLink] = useState([]);

  const { data, loading } = useQuery(SEE_MY_PAGE_LINK_QUERY, {
    variables: {
      userEmail,
    },
    skip: !userEmail,
  });

  const onClickMoveIcon = () => {
    setInit(false);
    moveLinkPick();
  };

  useEffect(() => {
    if (data) {
      setMyPageLink(data?.seeMyPageLink);
    }
  }, [data]);

  return (
    <MoveContainer pageLinkSection={pageLinkSection} init={init}>
      <MoveIcon onClick={onClickMoveIcon}>
        <FaArrowCircleRight />{" "}
      </MoveIcon>
      <FolderList right={true} />
      <ContentsList right={true}>
        <PageLinkTitle left={true}>나의 즐겨찾기 페이지</PageLinkTitle>

        <PageLinkList>
          {myPageLink.length === 0 ? (
            <div>등록된 즐겨찾기 페이지가 없습니다.</div>
          ) : (
            myPageLink.map((item, index) => {
              return <MyPageLink key={index} item={item} />;
            })
          )}
        </PageLinkList>
      </ContentsList>
    </MoveContainer>
  );
};

export default PageLinkSection;
