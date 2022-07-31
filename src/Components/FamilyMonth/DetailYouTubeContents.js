import { format } from "date-fns";
import React from "react";
import styled from "styled-components";
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import YouTubeTag from "./YouTubeTag";
import { useMutation } from "@apollo/client";
import { TOGGLE_FAMILY_STORY_LIKE_MUTATION } from "../../Graphql/FamilyStory/mutation";
import { MY_FAMILY_STORY_LIKE_NUM, SEE_LIKE_FAMILY_STORY } from "../../Graphql/FamilyStory/query";
import TextareaAutosize from "react-textarea-autosize";

const Container = styled.div`
  display: grid;
  row-gap: 20px;
  row-gap: 1.25rem;
  margin-bottom: 20px;
  margin-bottom: 1.25rem;
  textarea {
    all: unset;
    line-height: 160%;
    min-height: 100%;
    max-height: 100%;
    width: 100%;
    resize: none;
    padding: 15px 20px;
    padding: 0.9375rem 1.25rem;
    box-sizing: border-box;
    background-color: ${(props) => props.theme.cardBg};
    transition: background-color 1s ease;
    padding: 15px 20px;
    padding: 0.938rem 1.25rem;
    border-radius: 10px;
    border-radius: 0.625rem;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
    ::placeholder {
      color: ${(props) => props.theme.fontColor};
      opacity: 0.6;
      transition: color 1s ease;
    }
  }
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
  cursor: pointer;
  svg {
    display: flex;
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

const Text = styled.div`
  background-color: rgba(255, 255, 255, 0.4);
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
`;

const DetailYouTubeContents = ({
  _id,
  title,
  createdAt,
  likeNum,
  userEmail,
  bgColor,
  tag,
  isLiked,
  loggedInUserEmail,
  setErrMsg,
  contents,
}) => {
  const [toggleFamilyStoryLike, { loading }] = useMutation(TOGGLE_FAMILY_STORY_LIKE_MUTATION, {
    refetchQueries: [
      {
        query: SEE_LIKE_FAMILY_STORY,
        variables: { userEmail: loggedInUserEmail, page: 1 },
      },
      {
        query: MY_FAMILY_STORY_LIKE_NUM,
        variables: { userEmail: loggedInUserEmail },
      },
    ],
    update: (cache, data) => {
      const {
        data: {
          toggleFamilyStoryLike: { ok, message },
        },
      } = data;
      if (ok) {
        cache.modify({
          id: `FamilyStory:${_id}`,
          fields: {
            likeNum: (prev) => {
              if (message === "create") {
                return prev + 1;
              } else {
                return prev - 1;
              }
            },
            isLiked: (prev) => {
              return !prev;
            },
          },
        });
      }
    },
  });
  const onClickLikeBtn = () => {
    if (!loggedInUserEmail) {
      setErrMsg("로그인이 필요합니다.😅");
    }
    if (loggedInUserEmail) {
      toggleFamilyStoryLike({
        variables: {
          userEmail: loggedInUserEmail,
          familyStoryId: _id,
        },
      });
    }
  };

  return (
    <Container>
      <TopContents>
        <Title>{title}</Title>
        <ContentsInfo>
          <div>{userEmail}</div>
          <CreatedAt>{createdAt && format(createdAt, "yy.MM.dd")}</CreatedAt>
        </ContentsInfo>
        <Liked>
          <Icon onClick={onClickLikeBtn}>
            {isLiked ? <BsSuitHeartFill style={{ color: "#e84545" }} /> : <BsSuitHeart />}
          </Icon>
          <LikedNum>{likeNum}개</LikedNum>
        </Liked>
        {tag && (
          <Tags>
            {tag.map((item, index) => {
              return <YouTubeTag key={index} tag={item} bgColor={bgColor} />;
            })}
          </Tags>
        )}
      </TopContents>
      <TextareaAutosize value={contents} maxRows={10}></TextareaAutosize>
    </Container>
  );
};

export default DetailYouTubeContents;
