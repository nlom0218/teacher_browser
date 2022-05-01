import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import qs from "qs";
import PageBtn from "./Shared/PageBtn";
import styled from "styled-components";
import YouTubeList from "./Shared/YouTubeList";
import { customMedia } from "../../styles";
import { useQuery } from "@apollo/client";
import {
  MY_FAMILY_STORY_LIKE_NUM,
  SEE_LIKE_FAMILY_STORY,
} from "../../Graphql/FamilyStory/query";
import Loading from "../Shared/Loading";
import { BsSuitHeartFill } from "react-icons/bs";
import NotContentsMsgContainer from "./NotContentsMsgContainer";

const Container = styled.div`
  align-self: flex-start;
  display: grid;
  row-gap: 20px;
  row-gap: 1.25rem;
  ${customMedia.greaterThan("tablet")`
    grid-template-columns: 1fr auto;
  `}
`;

const LikedMsg = styled.div`
  align-self: center;
  padding-left: 20px;
  padding-left: 1.25rem;
  display: flex;
  align-items: center;
  font-size: 1.25em;
  font-size: 1.25rem;
  svg {
    display: flex;
    margin-left: 5px;
    margin-left: 0.3125rem;
    color: #e84545;
  }
`;

const LikedYouTube = ({ userEmail }) => {
  const [familyStoryArr, setFamilyStoryArr] = useState([]);
  const location = useLocation();
  const { page } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  const { data, loading, refetch } = useQuery(SEE_LIKE_FAMILY_STORY, {
    variables: {
      userEmail,
      page: parseInt(page),
    },
    skip: !userEmail,
  });

  const { data: num, loading: numLoading } = useQuery(
    MY_FAMILY_STORY_LIKE_NUM,
    {
      variables: { userEmail },
      skip: !userEmail,
    }
  );

  useEffect(() => {
    if (data) {
      const newFamilyStoryArr = data?.seeLikeFamilyStory.map((item) => {
        return item.familyStory;
      });
      setFamilyStoryArr(newFamilyStoryArr);
    }
  }, [data]);
  if (loading) {
    return <Loading page="subPage" />;
  }
  return (
    <Container>
      <LikedMsg>
        <div>좋아요 한 가정의 달 이야기</div>
        <BsSuitHeartFill />
      </LikedMsg>
      <PageBtn
        refetch={refetch}
        page={page}
        pageType="liked"
        itemNum={num?.myFamilyStoryLikeNum}
      />
      {familyStoryArr.length === 0 ? (
        <NotContentsMsgContainer preText="좋아요 한" />
      ) : (
        <YouTubeList youtubeList={familyStoryArr} />
      )}
    </Container>
  );
};

export default LikedYouTube;
