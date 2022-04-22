import { format } from "date-fns";
import React from "react";
import styled from "styled-components";
import { FaHeart } from "react-icons/fa";

const Container = styled.div`
  display: grid;
  row-gap: 20px;
`;

const TopContents = styled.div`
  display: grid;
  row-gap: 20px;
  grid-template-columns: 1fr auto;
  font-size: 1.25em;
  font-size: 1.25rem;
`;

const Title = styled.div`
  grid-column: 1 / -1;
  font-size: 1.5em;
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 120%;
`;

const ContentsInfo = styled.div`
  display: grid;
  row-gap: 10px;
  row-gap: 0.625rem;
`;

const CreatedAt = styled.div``;

const Liked = styled.div`
  display: grid;
  row-gap: 10px;
  row-gap: 0.625rem;
  justify-items: center;
`;

const Icon = styled.div`
  svg {
    display: flex;
    color: #e84545;
  }
`;

const LikedNum = styled.div``;

const TextareaLayout = styled.div`
  height: 200px;
  background-color: ${(props) => props.theme.cardBg};
  border-radius: 20px;
  border-radius: 1.25rem;
  padding: 20px;
  padding: 1.25rem;
`;

const Text = styled.div`
  background-color: rgba(255, 255, 255, 0.4);
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
`;

const DetailYouTubeContents = ({
  title,
  createdAt,
  likeNum,
  onwer,
  bgColor,
}) => {
  return (
    <Container>
      <TopContents>
        <Title>{title}</Title>
        <ContentsInfo>
          <div>{onwer}</div>
          <CreatedAt>{format(createdAt, "yy.MM.dd")}</CreatedAt>
        </ContentsInfo>
        <Liked>
          <Icon>
            <FaHeart />
          </Icon>
          <LikedNum>{likeNum}개</LikedNum>
        </Liked>
      </TopContents>
      <TextareaLayout bgColor={bgColor}>sdfsdfsdf</TextareaLayout>
    </Container>
  );
};

export default DetailYouTubeContents;
