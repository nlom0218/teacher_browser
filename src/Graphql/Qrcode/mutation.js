import gql from "graphql-tag";

export const CREATE_QRCODE_MUTATION = gql`
  mutation CreateQrcode($userEmail: String!, $title: String!, $url: String!) {
    createQrcode(userEmail: $userEmail, title: $title, url: $url) {
      ok
      error
    }
  }
`;
export const UPDATE_QRCODE_MUTATION = gql`
  mutation UpdateQrcode($userEmail: String!, $_id: ID!, $title: String, $url: String) {
    updateQrcode(userEmail: $userEmail, qrcodeId: $_id, title: $title, url: $url) {
      ok
      error
    }
  }
`;
export const DELETE_QRCODE_MUTATION = gql`
  mutation DeleteQrcode($userEmail: String!, $_id: ID!) {
    deleteQrcode(userEmail: $userEmail, qrcodeId: $_id) {
      ok
      error
    }
  }
`;
export const CHANGE_INDEX_QRCODE_MUTATION = gql`
  mutation ChangeIndexQrcode($userEmail: String!, $_id: ID!) {
    changeIndexQrcode(userEmail: $userEmail, qrcodeId1: $_id, qrcodeId2: $_id) {
      ok
      error
    }
  }
`;
