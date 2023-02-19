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

export const UPDATE_ROLE = gql`
  mutation UpdateRole($userEmail: String!, $id: ID!, $title: String, $detail: String) {
    updateRole(userEmail: $userEmail, _id: $id, title: $title, detail: $detail) {
      _id
    }
  }
`;

export const UPDATE_ROLES = gql`
  mutation UpdateRoles($userEmail: String!, $id: ID!, $startDate: Float, $endDate: Float) {
    updateRoles(userEmail: $userEmail, _id: $id, startDate: $startDate, endDate: $endDate) {
      _id
    }
  }
`;
