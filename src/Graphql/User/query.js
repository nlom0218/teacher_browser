import gql from "graphql-tag";

export const CHECK_PASSWORD_QUERY = gql`
  query CheckPw($userEmail: String!, $password: String) {
    checkPw(userEmail: $userEmail, password: $password) {
      ok
      error
    }
  }
`;

export const VALIDATION_LINK_URL_QUERY = gql`
  query Query($url: String!) {
    validationLinkUrl(url: $url)
  }
`;
