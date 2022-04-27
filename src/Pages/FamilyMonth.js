import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { customMedia } from "../styles";
import BasicContainer from "../Components/Shared/BasicContainer";
import BtnContainer from "../Components/FamilyMonth/BtnContainer";
import { useParams } from "react-router-dom";
import DetailYouTube from "../Components/FamilyMonth/DetailYouTube";
import CreateYouTube from "../Components/FamilyMonth/CreateYouTube";
import AllListYoutube from "../Components/FamilyMonth/AllListYouTube";
import { useReactiveVar } from "@apollo/client";
import { isFullScreenModeVar } from "../apollo";
import useMedia from "../Hooks/useMedia";
import useMe from "../Hooks/useMe";
import AlertMessage from "../Components/Shared/AlertMessage";
import SearchYouTube from "../Components/FamilyMonth/SearchYouTube";
import LikedYouTube from "../Components/FamilyMonth/LikedYouTube";
import MyYouTube from "../Components/FamilyMonth/MyYoutube";

const Container = styled.div`
  min-height: 100%;
  display: grid;
  padding: 40px 20px;
  padding: 2.5rem 1.25rem;
  grid-template-rows: 1fr;
  row-gap: 40px;
  row-gap: 2.5rem;
  ${customMedia.greaterThan("tablet")`
    padding: 40px;
    padding: 2.5rem;
  `}
`;

const BottomContents = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 40px;
  column-gap: 2.5rem;
`;

const ContentsLayout = styled.div`
  position: relative;
`;

const ContentsScrollLayout = styled.div`
  position: absolute;
  min-height: 100%;
  max-height: 100%;
  min-width: 100%;
  max-width: 100%;
  overflow: scroll;
  -ms-overflow-style: none; // IE and Edge
  scrollbar-width: none; // Firefox
  ::-webkit-scrollbar {
    display: none; // Chrome, Safari, Opera
  }
  display: grid;
  grid-template-rows: 1fr;
  align-items: flex-start;
`;

const FamilyMonth = () => {
  const me = useMe();
  const { page, id } = useParams();
  const [errMsg, setErrMsg] = useState(undefined);
  const [multiply, setMultiply] = useState();
  const isFullScreenMode = useReactiveVar(isFullScreenModeVar);
  const media = useMedia();
  useEffect(() => {
    if (media !== "Desktop") {
      setMultiply(3.5);
      return;
    }
    if (isFullScreenMode) {
      setMultiply(3.5);
      return;
    }
    setMultiply(2.5);
  }, [media, isFullScreenMode]);
  return (
    <BasicContainer menuItem={true}>
      <Container>
        <BottomContents>
          <BtnContainer page={page} userEmail={me?.email} />
          <ContentsLayout>
            <ContentsScrollLayout>
              {id && (
                <DetailYouTube
                  id={id}
                  multiply={multiply}
                  userEmail={me?.email}
                  setErrMsg={setErrMsg}
                />
              )}
              {!id && page === "list" && <AllListYoutube />}
              {!id && page === "create" && (
                <CreateYouTube
                  multiply={multiply}
                  userEmail={me?.email}
                  setErrMsg={setErrMsg}
                />
              )}
              {!id && page === "liked" && <LikedYouTube />}
              {!id && page === "search" && (
                <SearchYouTube setErrMsg={setErrMsg} />
              )}
              {!id && page === "my" && (
                <MyYouTube setErrMsg={setErrMsg} userEmail={me?.email} />
              )}
            </ContentsScrollLayout>
          </ContentsLayout>
        </BottomContents>
      </Container>
      {errMsg && (
        <AlertMessage
          msg={errMsg}
          setMsg={setErrMsg}
          type="error"
          time={3000}
        />
      )}
    </BasicContainer>
  );
};

export default FamilyMonth;
