import { gql } from "@apollo/client";

export const HAS_ROLES = gql`
  query Roles($userEmail: String!) {
    roles(userEmail: $userEmail) {
      _id
    }
  }
`;

export const SEE_ROLES = gql`
  query Roles($userEmail: String!) {
    roles(userEmail: $userEmail) {
      _id
      endDate
      startDate
      roles {
        _id
        detail
        roles
        students {
          _id
          studentName
        }
        title
      }
    }
  }
`;
