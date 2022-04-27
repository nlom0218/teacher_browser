import React from "react";
import { useLocation } from "react-router-dom";
import qs from "qs";
import PageBtn from "./Shared/PageBtn";
import styled from "styled-components";
import YouTubeList from "./Shared/YouTubeList";
import { youtubeList } from "./AllListYouTube";
import { customMedia } from "../../styles";
import { AiFillFolderOpen } from "react-icons/ai";
import { useQuery } from "@apollo/client";
import { SEE_MY_FAMILY_STORY_QUERY } from "../../Graphql/FamilyStory/query";
import Loading from "../Shared/Loading";
import NeedLoginPopupContainer from "../Shared/NeedLoginPopupContainer";
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
  }
`;

const MyYouTube = ({ userEmail }) => {
  const location = useLocation();
  const { page } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  const { data, loading } = useQuery(SEE_MY_FAMILY_STORY_QUERY, {
    variables: { userEmail },
    skip: !userEmail,
  });
  if (loading || !userEmail) {
    return <Loading page="subPage" />;
  }
  console.log(data);
  return (
    <Container>
      <LikedMsg>
        <div>내가 만든 가정의 달 이야기</div>
        <AiFillFolderOpen />
      </LikedMsg>
      <PageBtn page={page} pageType="liked" />
      {data?.seeMyFamilyStory?.length === 0 ? (
        <NotContentsMsgContainer preText="내가 만든" />
      ) : (
        <YouTubeList youtubeList={data?.seeMyFamilyStory} />
      )}
    </Container>
  );
};

export default MyYouTube;