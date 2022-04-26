import { gql } from "@apollo/client";

export const SeeAllFamilyStory = gql`
  query SeeAllFamilyStory {
    seeAllFamilyStory {
      _id
      userEmail
      url
      title
      bgColor
      videoType
      tag
      createdAt
      contetns
    }
  }
`;
