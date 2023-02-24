import gql from "graphql-tag";

export const CREATE_ROLES_MUTATION = gql`
  mutation CreateRoles($userEmail: String!, $startDate: Float!, $endDate: Float!, $data: [RoleInput!]) {
    createRoles(userEmail: $userEmail, startDate: $startDate, endDate: $endDate, data: $data) {
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
  mutation UpdateRoles($userEmail: String!, $order: Int!, $startDate: Float, $endDate: Float, $data: [RoleIdInput]) {
    updateRoles(userEmail: $userEmail, order: $order, startDate: $startDate, endDate: $endDate, data: $data) {
      ok
      error
    }
  }
`;
