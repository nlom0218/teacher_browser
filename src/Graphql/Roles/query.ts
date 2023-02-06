import { gql } from "@apollo/client";

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
