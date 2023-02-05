import gql from "graphql-tag";

export const CREATE_ROLES = gql`
  mutation Mutation($userEmail: String!, $startDate: Float!, $endDate: Float!) {
    createRoles(userEmail: $userEmail, startDate: $startDate, endDate: $endDate) {
      _id
    }
  }
`;

export const ADD_ROLE = gql`
  mutation Mutation($userEmail: String!, $data: [RoleInput!]) {
    addRole(userEmail: $userEmail, data: $data) {
      _id
    }
  }
`;
