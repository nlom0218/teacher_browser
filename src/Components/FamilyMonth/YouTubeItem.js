import React, { useState } from "react";
import styled from "styled-components";
import getYouTubeId from "get-youtube-id";
import { format } from "date-fns";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import routes from "../../routes";

const SYouTubeItem = styled.div`
  padding: 20px;
  padding: 1.25rem;
  color: rgb(10, 10, 10);
  background-color: ${(props) => props.bgColor};
  display: grid;
  grid-template-rows: 1fr 3fr;
  row-gap: 20px;
  row-gap: 1.25rem;
  cursor: pointer;
  position: relative;
  border-radius: 20px;
  border-radius: 1.25rem;
  box-shadow: ${(props) =>
    props.hover
      ? "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px"
      : "rgba(0, 0, 0, 0.24) 0px 3px 8px"};
  transform: ${(props) => (props.hover ? "scale(1.02)" : "scale(1)")};
  transition: transform 0.4s ease, box-shadow 0.4s ease;
  :hover {
    /* background-color: ${(props) => props.theme.hoverColor}; */
  }
`;

const YouTubeInfo = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  column-gap: 10px;
  column-gap: 0.625rem;
`;

const YouTubeImg = styled.img`
  object-fit: cover;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
`;

const YouTubeType = styled.div`
  justify-self: flex-end;
  padding: 10px 20px;
  padding: 0.625rem 1.25rem;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 40px;
  border-radius: 2.5rem;
  font-size: 14px;
  font-size: 0.875rem;
  font-weight: 600;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  text-align: center;
`;

const ContentsInfo = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: 1fr auto;
  column-gap: 10px;
  column-gap: 0.625rem;
  row-gap: 20px;
  row-gap: 1.25rem;
`;

const ContentsTitle = styled.div`
  grid-column: 1 / -1;
  display: grid;
  align-items: flex-start;
  line-height: 120%;
  align-self: center;
  text-align: center;
  font-size: 1.25em;
  font-size: 1.25rem;
  /* overflow: scroll;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: break-all; */
`;

const ContentsLikedNum = styled.div`
  justify-self: flex-start;
  color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  svg {
    display: flex;
    color: #e84545;
    margin-right: 5px;
    margin-right: 0.3125rem;
  }
`;

const CreatedAt = styled.div`
  justify-self: flex-end;
  color: rgba(0, 0, 0, 0.6);
`;

const YouTubeItem = ({
  url,
  title,
  bgColor,
  videoType,
  createdAt,
  likeNum,
  _id,
}) => {
  const [hover, setHover] = useState(false);
  const navigate = useNavigate();
  const getYouTubeImg = (youTubeUrl) => {
    return `https://img.youtube.com/vi/${getYouTubeId(youTubeUrl)}/0.jpg`;
  };
  const onClickYouTubeItem = () => {
    navigate(`${routes.familyMonth}/list/${_id}`);
  };
  return (
    <SYouTubeItem
      onClick={onClickYouTubeItem}
      bgColor={bgColor}
      hover={hover}
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
    >
      <YouTubeInfo>
        <YouTubeImg src={getYouTubeImg(url)}></YouTubeImg>
        <YouTubeType>{videoType}</YouTubeType>
      </YouTubeInfo>
      <ContentsInfo>
        <ContentsTitle>{title}</ContentsTitle>
        <ContentsLikedNum>
          <FaHeart />
          {likeNum}개
        </ContentsLikedNum>
        <CreatedAt>{format(createdAt, "yy.MM.dd")}</CreatedAt>
      </ContentsInfo>
    </SYouTubeItem>
  );
};

export default YouTubeItem;
