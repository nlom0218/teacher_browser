import getYouTubeID from "get-youtube-id";
import React from "react";
import styled from "styled-components";
import DetailYouTubeContents from "./DetailYouTubeContents";
import MainContentsLayout from "./MainContentsLayout";
import { useQuery } from "@apollo/client";
import { SEE_FAMILY_STORY_QERUY } from "../../Graphql/FamilyStory/query";
import Loading from "../Shared/Loading";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

const YouTubePlayer = styled.div`
  width: 100%;
  justify-self: center;
  height: calc(${(props) => props.multiply} * 9vw);
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
`;

const BtnContainer = styled.div`
  justify-self: flex-end;
  display: grid;
  grid-template-columns: auto auto;
  column-gap: 20px;
  column-gap: 1.25rem;
`;

const Btn = styled.div`
  font-size: 1.5em;
  font-size: 1.5rem;
  cursor: pointer;
  svg {
    display: flex;
  }
`;

const DetailYouTube = ({ id, multiply, userEmail, setErrMsg }) => {
  const { data, loading } = useQuery(SEE_FAMILY_STORY_QERUY, {
    variables: { id },
  });

  if (loading) {
    return <Loading page="subPage" />;
  }

  return (
    <MainContentsLayout>
      {userEmail === data?.seeFamilyStory?.userEmail && (
        <BtnContainer>
          <Btn>
            <AiFillEdit />
          </Btn>
          <Btn>
            <AiFillDelete />
          </Btn>
        </BtnContainer>
      )}
      <YouTubePlayer multiply={multiply}>
        <iframe
          src={`https://www.youtube.com/embed/${getYouTubeID(
            data?.seeFamilyStory?.url
          )}?showinfo=0&enablejsapi=1`}
          width="100%"
          height="100%"
          title={data?.seeFamilyStory?.title}
        ></iframe>
      </YouTubePlayer>
      <DetailYouTubeContents
        {...data?.seeFamilyStory}
        loggedInUserEmail={userEmail}
        setErrMsg={setErrMsg}
      />
    </MainContentsLayout>
  );
};

export default DetailYouTube;
