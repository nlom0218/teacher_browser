import gql from "graphql-tag";

export const CREATE_ROLES = gql`
  mutation Mutation($userEmail: String!, $startDate: Float!, $endDate: Float!) {
    createRoles(userEmail: $userEmail, startDate: $startDate, endDate: $endDate) {
      roles {
        _id
      }
    }
  }
`;
