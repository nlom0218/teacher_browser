import { gql } from "@apollo/client";

export const HAS_ROLES = gql`
  query Roles($userEmail: String!) {
    roles(userEmail: $userEmail) {
      _id
    }
  }
`;

export const SEE_ROLES_QUERY = gql`
  query Roles($userEmail: String!, $id: ID) {
    roles(userEmail: $userEmail, _id: $id) {
      _id
      dates {
        endDate
        order
        startDate
      }
      roles {
        _id
        detail
        roles
        students {
          order
          students {
            _id
            studentName
            roleHistory
          }
        }
        title
      }
    }
  }
`;
