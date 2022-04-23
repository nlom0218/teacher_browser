import { useReactiveVar } from "@apollo/client";
import getYouTubeID from "get-youtube-id";
import React, { useState } from "react";
import { AiFillYoutube } from "react-icons/ai";
import styled from "styled-components";
import { darkModeVar } from "../../apollo";

const Container = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  column-gap: 20px;
  column-gap: 1.25rem;
  row-gap: 20px;
  row-gap: 1.25rem;
`;

const Icon = styled.div`
  svg {
    display: flex;
    font-size: 2em;
    font-size: 2rem;
    color: #ff2600;
  }
`;

const Input = styled.input`
  background-color: ${(props) => props.theme.cardBg};
  transition: background-color 1s ease;
  padding: 10px;
  padding: 0.625rem;
  border-radius: 10px;
  border-radius: 0.625rem;
  ::placeholder {
    color: ${(props) => props.theme.fontColor};
    opacity: 0.6;
    transition: color 1s ease;
  }
`;

const Review = styled.div`
  grid-column: 1 / -1;
  height: calc(${(props) => props.multiply} * 9vw);
  box-shadow: ${(props) =>
    props.isReview &&
    "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px"};
`;

const ReviewBox = styled.div`
  padding: 10px;
  padding: 0.625rem;
  height: 100%;
  background-color: ${(props) => props.theme.cardBg};
  transition: background-color 1s ease, border 1s ease;
  svg {
    display: flex;
    font-size: 5em;
    font-size: 5rem;
    color: #ff2600;
  }
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  div {
    margin-top: 10px;
    margin-top: 0.625rem;
    line-height: 120%;
    font-weight: 600;
    text-align: center;
  }
  .reivew {
    font-size: 1.25em;
    font-size: 1.25rem;
  }
`;

const YouTubeInput = ({ register, multiply, watch, getValues }) => {
  const darkMode = useReactiveVar(darkModeVar);
  return (
    <Container>
      <Icon>
        <AiFillYoutube />
      </Icon>
      <Input
        {...register("youtubeUrl")}
        placeholder="유튜브 영상 주소를 입력하세요.😀 ex) https://www.youtube.com/watch?v=****"
      />
      <Review multiply={multiply} isReview={watch("youtubeUrl") !== ""}>
        {!getValues("youtubeUrl") ? (
          <ReviewBox darkMode={darkMode}>
            <AiFillYoutube />
            <div className="reivew">유튜브 미리보기</div>
            <div>
              정확한 주소를 입력하세요. 주소가 정확하지 않으면 미리보기 재생이
              안됩니다.😭
            </div>
          </ReviewBox>
        ) : (
          <iframe
            src={`https://www.youtube.com/embed/${getYouTubeID(
              watch("youtubeUrl")
            )}?showinfo=0&enablejsapi=1`}
            width="100%"
            height="100%"
            title="미리보기"
          ></iframe>
        )}
      </Review>
    </Container>
  );
};

export default YouTubeInput;
