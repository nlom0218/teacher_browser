import { gql } from "@apollo/client";

export const SEE_ALL_FAMILY_STORY_QEURY = gql`
  query SeeAllFamilyStory {
    seeAllFamilyStory {
      _id
      userEmail
      url
      title
      bgColor
      tag
      videoType
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
  query SeeMyFamilyStory($userEmail: String!) {
    seeMyFamilyStory(userEmail: $userEmail) {
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
  query SeeLikeFamilyStory($userEmail: String!) {
    seeLikeFamilyStory(userEmail: $userEmail) {
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
