import gql from "graphql-tag";

export const XMAS_MSG_QUERY = gql`
  query XmasMsg($userEmail: String, $pageNumber: Int) {
    xmasMsg(userEmail: $userEmail, pageNumber: $pageNumber) {
      count
      msg {
        _id
        userEmail
        author
        text
        bg
      }
    }
  }
`;
