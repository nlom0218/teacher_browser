import React from "react";
import styled from "styled-components";

const Container = styled.div`
  padding-left: 20px;
  padding-left: 1.25rem;
`;

const NotContentsMsgContainer = ({ preText }) => {
  return <Container>{preText} 가정의 달 이야기가 없습니다.🥹</Container>;
};

export default NotContentsMsgContainer;
