import gql from "graphql-tag";

export const QRCODES_QUERY = gql`
  query Qrcodes($userEmail: String!) {
    qrcodes(userEmail: $userEmail) {
      _id
      userEmail
      title
      url
      index
    }
  }
`;
