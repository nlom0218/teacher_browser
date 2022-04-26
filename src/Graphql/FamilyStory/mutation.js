import { gql } from "@apollo/client";

export const CreateFamilyStory = gql`
  mutation CreateFamilyStory(
    $userEmail: String!
    $url: String!
    $title: String!
    $bgColor: String!
    $videoType: String!
    $createdAt: Float!
    $contents: String!
    $tag: [String]
  ) {
    createFamilyStory(
      userEmail: $userEmail
      url: $url
      title: $title
      bgColor: $bgColor
      videoType: $videoType
      createdAt: $createdAt
      contents: $contents
      tag: $tag
    ) {
      ok
      id
      error
    }
  }
`;
