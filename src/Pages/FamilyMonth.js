import React from "react";
import styled from "styled-components";
import { customMedia } from "../styles";
import TopContents from "../Components/FamilyMonth/TopContents";
import MainYouTube from "../Components/FamilyMonth/MainYouTube";
import BasicContainer from "../Components/Shared/BasicContainer";

const Container = styled.div`
  min-height: 100%;
  display: grid;
  padding: 40px 20px;
  padding: 2.5rem 1.25rem;
  grid-template-rows: auto 1fr;
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
`;

const BtnLayout = styled.div``;

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
`;

const FamilyMonth = () => {
  return (
    <BasicContainer menuItem={true}>
      <Container>
        <TopContents />
        <BottomContents>
          <BtnLayout>
            <div>btn1</div>
            <div>btn2</div>
            <div>btn3</div>
            <div>btn4</div>
          </BtnLayout>
          <ContentsLayout>
            <ContentsScrollLayout>
              <MainYouTube />
            </ContentsScrollLayout>
          </ContentsLayout>
        </BottomContents>
      </Container>
    </BasicContainer>
  );
};

export default FamilyMonth;
