import gql from "graphql-tag";

export const CREATE_XMAS_MSG_MUTATION = gql`
  mutation CreateXmasMsg($userEmail: String!, $author: String!, $text: String!, $bg: Int) {
    createXmasMsg(userEmail: $userEmail, author: $author, text: $text, bg: $bg) {
      ok
      error
    }
  }
`;

export const UPDATE_XMAS_MSG_MUTATION = gql`
  mutation UpdateXmasMsg($userEmail: String!, $xmasMsgId: ID!, $author: String, $text: String, $bg: Int) {
    updateXmasMsg(userEmail: $userEmail, xmasMsgId: $xmasMsgId, author: $author, text: $text, bg: $bg) {
      ok
      error
    }
  }
`;

export const DELETE_XMAS_MSG_MUTATION = gql`
  mutation DeleteXmasMsg($userEmail: String!, $xmasMsgId: ID!) {
    deleteXmasMsg(userEmail: $userEmail, xmasMsgId: $xmasMsgId) {
      ok
      error
    }
  }
`;
