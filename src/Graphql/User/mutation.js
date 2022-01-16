import gql from "graphql-tag";

export const CREATE_USER_MUTATION = gql`
  mutation CreateUser($email: String!, $password: String!) {
    createUser(email: $email, password: $password) {
      ok
      error
    }
  }
`;

export const LOGIN_USER_MUTATION = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      ok
      token
      error
    }
  }
`;

export const NAVER_LOGIN_MUTATION = gql`
  mutation NaverLogin($email: String!) {
    naverLogin(email: $email) {
      ok
      token
    }
  }
`;

export const UPDATE_USER_BGTHEME_MUTATION = gql`
  mutation UpdateUser($userEmail: String!, $bgTheme: String) {
    updateUser(userEmail: $userEmail, bgTheme: $bgTheme) {
      ok
      error
    }
  }
`;

export const DELETE_SCHOOL_INFO_MUTATION = gql`
  mutation DeleteSchoolInfo($userEmail: String!) {
    deleteSchoolInfo(userEmail: $userEmail) {
      ok
      error
    }
  }
`;

export const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($userEmail: String!, $schoolName: String, $schoolCode: String, $areaCode: String, $schoolAdress: String) {
    updateUser(userEmail: $userEmail, schoolName: $schoolName, schoolCode: $schoolCode, areaCode: $areaCode, schoolAdress: $schoolAdress) {
      ok
      error
    }
  }
`;

export const CREATE_TAG_MUTATION = gql`
  mutation CreateTagMutation($userEmail: String!, $tag: [String]!) {
    createTag(userEmail: $userEmail, tag: $tag) {
      ok
      error
    }
  }
`;

export const DELETE_TAG_MUTATION = gql`
  mutation DeleteTag($userEmail: String!, $tag: String!) {
    deleteTag(userEmail: $userEmail, tag: $tag) {
      ok
      error
    }
  }
`;

export const DELETE_USER_MUTATION = gql`
  mutation DeleteUser($teacherEmail: String!) {
    deleteUser(teacherEmail: $teacherEmail) {
      ok
      error
    }
  }
`;

export const CHANGE_PASSWORD_MUTATION = gql`
  mutation ChangePw($userEmail: String!, $password: String!, $newPassword: String!) {
    changePw(userEmail: $userEmail, password: $password, newPassword: $newPassword) {
      ok
      error
    }
  }
`;
