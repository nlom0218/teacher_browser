import { gql } from "@apollo/client";

export const SEE_ALL_FAMILY_STORY_QEURY = gql`
  query SeeAllFamilyStory($page: Int!) {
    seeAllFamilyStory(page: $page) {
      _id
      userEmail
      url
      title
      bgColor
      videoType
      tag
      createdAt
      contents
      likeNum
      isLiked
    }
  }
`;

export const SEE_FAMILY_STORY_QERUY = gql`
  query SeeFamilyStory($id: String!) {
    seeFamilyStory(id: $id) {
      _id
      userEmail
      url
      title
      bgColor
      videoType
      tag
      contents
      createdAt
      likeNum
      isLiked
    }
  }
`;

export const SEE_MY_FAMILY_STORY_QUERY = gql`
  query SeeMyFamilyStory($userEmail: String!, $page: Int!) {
    seeMyFamilyStory(userEmail: $userEmail, page: $page) {
      _id
      userEmail
      url
      title
      bgColor
      videoType
      tag
      createdAt
      contents
      likeNum
      isLiked
    }
  }
`;

export const SEE_LIKE_FAMILY_STORY = gql`
  query SeeLikeFamilyStory($userEmail: String!, $page: Int!) {
    seeLikeFamilyStory(userEmail: $userEmail, page: $page) {
      _id
      userEmail
      familyStoryId
      familyStory {
        _id
        userEmail
        url
        title
        bgColor
        videoType
        tag
        createdAt
        contents
        likeNum
        isLiked
      }
    }
  }
`;

export const SEE_SEARCH_FAMILY_STORY = gql`
  query SeeSearchFamilyStory($tag: String!, $page: Int!) {
    seeSearchFamilyStory(tag: $tag, page: $page) {
      _id
      userEmail
      title
      url
      bgColor
      videoType
      tag
      createdAt
      contents
      likeNum
      isLiked
    }
  }
`;

export const ALL_FAMILY_STORY_NUM = gql`
  query Query {
    allFamilyStoryNum
  }
`;

export const MY_FAMILY_STORY_NUM = gql`
  query Query($userEmail: String!) {
    myFamilyStoryNum(userEmail: $userEmail)
  }
`;

export const MY_FAMILY_STORY_LIKE_NUM = gql`
  query Query($userEmail: String!) {
    myFamilyStoryLikeNum(userEmail: $userEmail)
  }
`;

export const SEARCH_FAMILY_STROY_NUM = gql`
  query Query($tag: String!) {
    searchFamilyStoryNum(tag: $tag)
  }
`;

export const SEE_RANDOM_FAMILY_STORY = gql`
  query SeeRandomFamilyStory {
    seeRandomFamilyStory {
      userEmail
      url
      title
      bgColor
      videoType
      tag
      createdAt
      contents
      likeNum
      isLiked
      _id
    }
  }
`;
