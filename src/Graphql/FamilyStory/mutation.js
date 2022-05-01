import { gql } from "@apollo/client";

export const CREATE_FAMILY_STORY_MUTATION = gql`
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

export const TOGGLE_FAMILY_STORY_LIKE_MUTATION = gql`
  mutation ToggleFamilyStoryLike($userEmail: String!, $familyStoryId: String!) {
    toggleFamilyStoryLike(
      userEmail: $userEmail
      familyStoryId: $familyStoryId
    ) {
      ok
      message
      error
    }
  }
`;

export const DELETE_FAMILY_STORY_MUTATION = gql`
  mutation DeleteFamilyStory($userEmail: String!, $familyStoryId: String!) {
    deleteFamilyStory(userEmail: $userEmail, familyStoryId: $familyStoryId) {
      ok
      error
    }
  }
`;
