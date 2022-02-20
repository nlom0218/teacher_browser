import React from 'react';
import styled from 'styled-components';
import BasicContainer from './BasicContainer';
import BtnPopupContainer from './BtnPopupContainer';
import PopupContainer from './PopupContainer';
import RandomCircle from './RandomCircle';

const Container = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, 50%);
`

// mainPage => 명렬표, 학급일지, 순서정하기 등 가장 메인이 되는 페이지
// subPage => 명렬표의 학생 디테일, 리스트 디테일 같이 메인 페이지에서 이동되는 서브 페이지
// popupPage => popup페이지
const Loading = ({ page }) => {
  return (<React.Fragment>
    {page === "mainPage" &&
      <BasicContainer screen="small">
        <Container>
          <RandomCircle />
        </Container>
      </BasicContainer>}
    {page === "subPage" &&
      <Container>
        <RandomCircle />
      </Container>}
    {page === "popupPage" &&
      <PopupContainer maxHeight={true}>
        <Container>
          <RandomCircle />
        </Container>
      </PopupContainer>}
    {page === "btnPopupPage" &&
      <BtnPopupContainer>
        <Container>
          <RandomCircle />
        </Container>
      </BtnPopupContainer>}
  </React.Fragment>);
}

export default Loading;