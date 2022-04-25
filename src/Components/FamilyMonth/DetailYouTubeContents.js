import { format } from "date-fns";
import React from "react";
import styled from "styled-components";
import { FaHeart } from "react-icons/fa";
import YouTubeTag from "./YouTubeTag";

const Container = styled.div`
  display: grid;
  row-gap: 20px;
  row-gap: 1.25rem;
`;

const TopContents = styled.div`
  display: grid;
  row-gap: 20px;
  row-gap: 1.25rem;
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

const Tags = styled.div`
  grid-column: 1 / -1;
  font-size: 14px;
  font-size: 0.875rem;
  display: flex;
  flex-wrap: wrap;
`;

const TextareaLayout = styled.div`
  height: 200px;
  background-color: ${(props) => props.theme.cardBg};
  transition: background-color 1s ease;
  border-radius: 10px;
  border-radius: 0.625rem;
  padding: 20px;
  padding: 1.25rem;
  margin-bottom: 20px;
  margin-bottom: 1.25rem;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
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
  tag,
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
        <Tags>
          {tag.map((item, index) => {
            return <YouTubeTag key={index} tag={item} bgColor={bgColor} />;
          })}
        </Tags>
      </TopContents>
      <TextareaLayout bgColor={bgColor}>sdfsdfsdf</TextareaLayout>
    </Container>
  );
};

export default DetailYouTubeContents;
