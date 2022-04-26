import { gql } from "@apollo/client";

export const SeeAllFamilyStory = gql`
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

export const SeeFamilyStory = gql`
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
