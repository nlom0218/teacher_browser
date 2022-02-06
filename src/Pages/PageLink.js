import styled from "styled-components";
import BasicContainer from "../Components/Shared/BasicContainer";
import React, { useState } from "react";
import { pageLinkSectionVar } from "../apollo";
import { useReactiveVar } from "@apollo/client";
import PageLinkSection from "../Components/PageLink/PageLinkSection";
import LinkPickSection from "../Components/PageLink/LinkPickSection";
import useMe from "../Hooks/useMe";
import AddBookmark from "../Components/PageLink/Popup/AddBookmark";
import { isPopupVar } from "../apollo";
import SeePageLink from "../Components/PageLink/Popup/SeePageLink";
import DetailPageLink from "../Components/PageLink/Popup/DetailPageLink";

//추천사이트 목록 정리하기
//나의 즐겨찾기에서 폴더별 정리
//즐겨찾기 없을 경우 설명하는 페이지 추가
//반응형 화면 구성
//linkname -> id

const Container = styled.div``;

const PageLink = () => {
  const me = useMe();
  const isPopup = useReactiveVar(isPopupVar);
  const pageLinkSection = useReactiveVar(pageLinkSectionVar);

  const [init, setInit] = useState(true);
  return (
    <BasicContainer>
      <Container>
        <PageLinkSection
          init={init}
          setInit={setInit}
          pageLinkSection={pageLinkSection}
          userEmail={me?.email}
        />
        <LinkPickSection
          init={init}
          setInit={setInit}
          pageLinkSection={pageLinkSection}
          userEmail={me?.email}
          link={me?.link}
        />
      </Container>
      {isPopup === "addBookmark" && <AddBookmark userEmail={me?.email} />}
      {isPopup === "seePageLink" && <SeePageLink />}
      {isPopup === "detailPageLink" && (
        <DetailPageLink memo={me?.link} userEmail={me?.email} />
      )}
    </BasicContainer>
  );
};

export default PageLink;
