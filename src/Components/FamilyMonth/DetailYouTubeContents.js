import React from "react";
import styled from "styled-components";

const Container = styled.div``;

const TopContents = styled.div`
  display: grid;
`;

const Title = styled.div`
  font-size: 1.5em;
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 120%;
`;

const DetailYouTubeContents = ({ title }) => {
  return (
    <Container>
      <TopContents>
        <Title>
          {title}sdfsdfsdfjsldjfklsdjkfljsdlfjsldfjoweijo ㅑㅓ대ㅑ저댜ㅐ
          ㅐㅑㅈ뎌개ㅑㅈ 갸ㅐㅈ뎌개ㅑㅈ 겨댜ㅐㅈ뎌개ㅑㅈ뎍 ㅐㅑ젹대ㅑㄴ
        </Title>
      </TopContents>
    </Container>
  );
};

export default DetailYouTubeContents;
