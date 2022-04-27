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
    }
  }
`;
