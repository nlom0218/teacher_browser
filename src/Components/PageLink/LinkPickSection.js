import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { color, customMedia } from "../../styles";
import { FaArrowCircleLeft, FaRegBookmark, FaBookmark } from "react-icons/fa";
import {
  hideNewsSection,
  seeNewsSection,
} from "../../Animations/WelcomeSectionAni";
import PageLinkSection from "./PageLinkSection";
import {
  linkPickFolderVar,
  movePageLink,
  pageLinkSectionVar,
} from "../../apollo";
import {
  BsBookmarkPlusFill,
  BsBookmarkPlus,
  BsStar,
  BsStarFill,
} from "react-icons/bs";
import { BiPlay, BiChevronDown } from "react-icons/bi";
import { IoArrowRedo } from "react-icons/io5";
import FolderList from "./FolderList";
import ContentsItem from "./ContentsItem";
import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import ContentsList from "./Styled/ContentsList";
import PageLinkTitle from "./Styled/PageLinkTitle";
import { SEE_PAGE_LINK_QUERY } from "../../Graphql/PageLink/query";
import PageLinkList from "./Styled/PageLinkList";

//드롭박스 폴더 선택 추가해야 함
//폴더 누를 때 색 변화 등 추가
//페이지 추천에 구글 폼 연결
//북마크 누르면 디비에 저장할 수 있고, 북마크 색도 계속 변화되게 북마크 누르면 저장.
//여기도 아코디언이 동시에 열리는게 안 됨. 안해도 될 것 같긴 함.
// 바로가기 버튼에 링크 연결

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
  pageLinkFolderName,
  link,
}) => {
  const [isSeeDisplay, setIsSeeDisplay] = useState(
    pageLinkSection === "pageLink" ? "none" : "block"
  );
  const [pick, setPick] = useState(false);
  const [folderPick, setFolderPick] = useState([]);
  const [viewContents, setViewContents] = useState();
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

  const onClickBookMark = () => {
    setPick(!pick);
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

        {/* 
{basicLinkEdu.map((item,i)=>{
        return( 
          <ContentsItem  key={i} item={item} />
)})} */}
      </ContentsList>
    </MoveContainer>
  );
};

export default LinkPickSection;
