import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import qs from "qs";
import PageBtn from "./Shared/PageBtn";
import YouTubeList from "./Shared/YouTubeList";
import { useQuery } from "@apollo/client";
import {
  ALL_FAMILY_STORY_NUM,
  SEE_ALL_FAMILY_STORY_QEURY,
} from "../../Graphql/FamilyStory/query";
import Loading from "../Shared/Loading";
import NotContentsMsgContainer from "./NotContentsMsgContainer";

const Container = styled.div`
  display: grid;
  row-gap: 20px;
  row-gap: 1.25rem;
`;

export const youtubeList = [
  {
    url: "https://www.youtube.com/watch?v=cS-IiArGmcU",
    title: "김진호-가족사진",
    bgColor: "#62D2A2",
    type: "노래",
    onwer: "nlom0218@naver.com",
    createdAt: 1650466800000,
    likeNum: 5,
    id: 1,
    tag: [
      "가족",
      "사랑",
      "슬픔",
      "사랑",
      "슬픔",
      "사랑",
      "슬픔",
      "사랑",
      "슬픔",
      "사랑",
      "슬픔",
      "사랑",
      "슬픔",
      "사랑",
      "슬픔",
      "사랑",
      "슬픔",
      "사랑",
      "슬픔",
      "사랑",
      "슬픔",
    ],
  },
  {
    url: "https://www.youtube.com/watch?v=7c64qLxZUb4&t=536s",
    title: "하정우 감독, 출연 영화",
    bgColor: "#FCE38A",
    type: "영화리뷰",
    onwer: "kwi0715@jr.naver.com",
    createdAt: 1650466800000,
    likeNum: 0,
    id: 2,
    tag: ["가족", "사랑", "슬픔"],
  },
  {
    url: "https://www.youtube.com/watch?v=wFeFIN8CI0A",
    title:
      "김진호가족사진김진호가족사진김진호가족사진김진호가족사진김진호가족사진김진호가족사진",
    bgColor: "#EAFFD0",
    type: "다큐",
    onwer: "tendy424@jr.naver.com",
    createdAt: 1650466800000,
    likeNum: 24,
    id: 3,
    tag: ["가족", "사랑", "슬픔"],
  },
  {
    url: "https://www.youtube.com/watch?v=G5kzUpWAusI&t=7s",
    title: "김진호-가족사진",
    bgColor: "#95E1D3",
    type: "코미디",
    onwer: "superanomie89@gmail.com",
    createdAt: 1650466800000,
    likeNum: 3,
    id: 4,
    tag: ["가족", "사랑", "슬픔"],
  },
  {
    url: "https://www.youtube.com/watch?v=IE8HIsIrq4o&t=37s",
    title: "김진호-가족사진",
    bgColor: "#E4D1B9",
    type: "브이로그",
    onwer: "sksthsaudgml@naver.com",
    createdAt: 1650466800000,
    likeNum: 1,
    id: 5,
    tag: ["가족", "사랑", "슬픔"],
  },
  {
    url: "https://www.youtube.com/watch?v=1z4NjPc4_i0",
    title: "김진호-가족사진",
    bgColor: "#AA96DA",
    type: "드라마리뷰드라마리뷰드라마리뷰",
    onwer: "soave424@hanmail.net",
    createdAt: 1650466800000,
    likeNum: 12,
    id: 6,
    tag: ["가족", "사랑", "슬픔"],
  },
  {
    url: "https://www.youtube.com/watch?v=P0ikE6tFbas",
    title: "김진호-가족사진",
    bgColor: "#FCE38A",
    type: "노래",
    onwer: "sksthsaudgml@gmail.com",
    createdAt: 1650466800000,
    likeNum: 20,
    id: 7,
    tag: ["가족", "사랑", "슬픔"],
  },
  {
    url: "https://www.youtube.com/watch?v=G5kzUpWAusI&t=7s",
    title: "김진호-가족사진",
    bgColor: "#FCBAD3",
    type: "노래",
    onwer: "soave424@nyjyangji.es.kr",
    createdAt: 1650466800000,
    likeNum: 7,
    id: 8,
    tag: ["가족", "사랑", "슬픔"],
  },
  {
    url: "https://www.youtube.com/watch?v=IE8HIsIrq4o&t=37s",
    title: "김진호-가족사진",
    bgColor: "#A8D8EA",
    type: "노래",
    onwer: "superanomie@naver.com",
    createdAt: 1650466800000,
    likeNum: 8,
    id: 9,
    tag: ["가족", "사랑", "슬픔"],
  },
  {
    url: "https://www.youtube.com/watch?v=1z4NjPc4_i0",
    title: "김진호-가족사진",
    bgColor: "#FFFFD2",
    type: "노래",
    onwer: "kwi07@hanmail.net",
    createdAt: 1650466800000,
    likeNum: 5,
    id: 10,
    tag: ["가족", "사랑", "슬픔"],
  },
  {
    url: "https://www.youtube.com/watch?v=P0ikE6tFbas",
    title: "김진호-가족사진",
    bgColor: "#DBE2EF",
    type: "노래",
    onwer: "teacher-browser@naver.com",
    createdAt: 1650466800000,
    likeNum: 5,
    id: 11,
    tag: ["가족", "사랑", "슬픔"],
  },
];

const AllListYoutube = () => {
  const location = useLocation();
  const { page } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  const { data, loading, refetch } = useQuery(SEE_ALL_FAMILY_STORY_QEURY, {
    variables: {
      page: parseInt(page),
    },
  });

  const { data: num, loading: numLoading } = useQuery(ALL_FAMILY_STORY_NUM);

  if (loading) {
    return <Loading page="subPage" />;
  }

  return (
    <Container>
      <PageBtn
        page={page}
        pageType="list"
        itemNum={num?.allFamilyStoryNum}
        refetch={refetch}
      />
      {data?.seeAllFamilyStory?.length === 0 ? (
        <NotContentsMsgContainer preText="생성된" />
      ) : (
        <YouTubeList youtubeList={data?.seeAllFamilyStory} />
      )}
    </Container>
  );
};

export default AllListYoutube;
