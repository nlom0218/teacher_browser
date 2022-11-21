import gql from "graphql-tag";

export const XMAS_MSG_QUERY = gql`
  query XmasMsg($userEmail: String!) {
    xmasMsg(userEmail: $userEmail) {
      _id
      userEmail
      author
      text
    }
  }
`;
