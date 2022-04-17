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
import useTitle from "../Hooks/useTitle";
import AlertMessage from "../Components/Shared/AlertMessage";
import NeedLoginPopupContainer from "../Components/Shared/NeedLoginPopupContainer";
import PageLinkHelper from "../Components/PageLink/Popup/PageLinkHelper";
import useMedia from "../Hooks/useMedia";

//추천사이트 목록 정리하기
//즐겨찾기 없을 경우 설명하는 페이지 추가
//반응형 화면 구성
// 즐겨찾기 삭제 시 바로 안 됨

const Container = styled.div``;

const PageLink = () => {
  useTitle("티처캔 | 즐겨찾기");
  const me = useMe();
  const media = useMedia();
  const isPopup = useReactiveVar(isPopupVar);
  const pageLinkSection = useReactiveVar(pageLinkSectionVar);

  const [msg, setMsg] = useState(undefined);

  const [init, setInit] = useState(true);
  return (
    <BasicContainer>
      <Container>
        <PageLinkSection init={init} setInit={setInit} pageLinkSection={pageLinkSection} userEmail={me?.email} media={media} />
        <LinkPickSection init={init} setInit={setInit} pageLinkSection={pageLinkSection} userEmail={me?.email} link={me?.link} setMsg={setMsg} media={media} />
      </Container>
      {isPopup === "addBookmark" && <AddBookmark userEmail={me?.email} setMsg={setMsg} />}
      {isPopup === "seePageLink" && <SeePageLink />}
      {isPopup === "detailPageLink" && <DetailPageLink link={me?.link} userEmail={me?.email} setMsg={setMsg} />}
      {isPopup === "needLogin" && <NeedLoginPopupContainer />}
      {isPopup === "pageLinkHelper" && <PageLinkHelper />}
      {msg && <AlertMessage type="success" time={3000} msg={msg} setMsg={setMsg} />}
    </BasicContainer>
  );
};

export default PageLink;
