import gql from "graphql-tag";

export const CREATE_QRCODE_QUERY = gql`
  query CreateQrcode($userEmail: String!, $title: String!, $url: String!) {
    createQrcode(userEmail: $userEmail, title: $title, url: $url) {
      userEmail
      title
      url
    }
  }
`;
export const UPDATE_QRCODE_QUERY = gql`
  query UpdateQrcode($userEmail: String!, $_id: ID!, $title: String, $url: String) {
    updateQrcode(userEmail: $userEmail, qrcodeId: $_id, title: $title, url: $url) {
      userEmail
      qrcodeId
      title
      url
    }
  }
`;
export const DELETE_QRCODE_QUERY = gql`
  query DeleteQrcode($userEmail: String!, $_id: ID!) {
    deleteQrcode(userEmail: $userEmail, qrcodeId: $_id) {
      userEmail
      qrcodeId
    }
  }
`;
export const CHANGE_INDEX_QRCODE_QUERY = gql`
  query ChangeIndexQrcode($userEmail: String!, $_id: ID!) {
    changeIndexQrcode(userEmail: $userEmail, qrcodeId1: $_id, qrcodeId2: $_id) {
      userEmail
      qrcodeId1
      qrcodeId2
    }
  }
`;
