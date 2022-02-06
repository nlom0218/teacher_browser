import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaArrowCircleLeft } from "react-icons/fa";
import {
  hideNewsSection,
  seeNewsSection,
} from "../../Animations/WelcomeSectionAni";
import {
  linkPickFolderVar,
  movePageLink,
  pageLinkSectionVar,
} from "../../apollo";
import FolderList from "./FolderList";
import ContentsItem from "./ContentsItem";
import { useQuery, useReactiveVar } from "@apollo/client";
import ContentsList from "./Styled/ContentsList";
import PageLinkTitle from "./Styled/PageLinkTitle";
import { SEE_PAGE_LINK_QUERY } from "../../Graphql/PageLink/query";
import PageLinkList from "./Styled/PageLinkList";

//페이지 추천에 구글 폼 연결

const MoveContainer = styled.div`
  display: ${(props) => props.isSeeDisplay};
  position: absolute;
  padding: 20px;
  padding: 1.25rem;
  top: 0;
  bottom: 0;
  right: ${(props) => (props.pageLinkSection === "pageLink" ? "-100%" : 0)};
  left: ${(props) => (props.pageLinkSection === "pageLink" ? "100%" : 0)};
  animation: ${(props) =>
      !props.init &&
      (props.pageLinkSection === "pageLink" ? hideNewsSection : seeNewsSection)}
    1s ease forwards;
`;
const MoveIcon = styled.div`
  position: absolute;
  top: 1%;
  left: 1%;
  z-index: 2;
  cursor: pointer;
  svg {
    display: flex;
    font-size: 1.5em;
    font-size: 1.5rem;
  }
`;

const LinkPickSection = ({
  userEmail,
  pageLinkSection,
  init,
  setInit,
  link,
}) => {
  const [isSeeDisplay, setIsSeeDisplay] = useState(
    pageLinkSection === "pageLink" ? "none" : "block"
  );

  const [userLinkTitleArr, setUserLinkTitleArr] = useState([]);

  const folder = useReactiveVar(linkPickFolderVar);

  const { data, loading } = useQuery(SEE_PAGE_LINK_QUERY, {
    variables: {
      folder: useReactiveVar(linkPickFolderVar),
    },
    skip: useReactiveVar(pageLinkSectionVar) !== "linkPick",
  });

  const onClickMoveIcon = () => {
    setInit(false);
    movePageLink();
  };

  useEffect(() => {
    if (pageLinkSection === "linkPick") {
      setIsSeeDisplay("block");
    }
  }, [pageLinkSection]);
  useEffect(() => {
    if (link) {
      setUserLinkTitleArr(link.map((item) => item.siteName));
    }
  }, [link]);
  return (
    <MoveContainer
      pageLinkSection={pageLinkSection}
      init={init}
      isSeeDisplay={isSeeDisplay}
    >
      <MoveIcon onClick={onClickMoveIcon}>
        <FaArrowCircleLeft />
      </MoveIcon>
      <FolderList />
      <ContentsList>
        <PageLinkTitle>추천 페이지</PageLinkTitle>
        <PageLinkList>
          {data &&
            data?.seePageLink.map((item, index) => {
              return (
                <ContentsItem
                  item={item}
                  key={index}
                  userEmail={userEmail}
                  userLinkTitleArr={userLinkTitleArr}
                />
              );
            })}
        </PageLinkList>
      </ContentsList>
    </MoveContainer>
  );
};

export default LinkPickSection;
