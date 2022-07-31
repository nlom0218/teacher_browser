import gql from "graphql-tag";

export const CREATE_STUDENT_LIST_MUTATION = gql`
  mutation CreateStudentList($teacherEmail: String!, $listName: String!) {
    createStudentList(teacherEmail: $teacherEmail, listName: $listName) {
      ok
      error
    }
  }
`;

export const EDIT_STUDENT_LIST = gql`
  mutation Mutation($teacherEmail: String!, $listId: ID!, $listIcon: String, $listName: String) {
    editStudentList(teacherEmail: $teacherEmail, listId: $listId, listIcon: $listIcon, listName: $listName) {
      ok
      error
    }
  }
`;

export const ADD_STUDENT_MUTATION = gql`
  mutation AddStudent($teacherEmail: String!, $studentId: [ID!], $listId: ID!) {
    addStudent(teacherEmail: $teacherEmail, studentId: $studentId, listId: $listId) {
      ok
      error
    }
  }
`;

export const EDIT_STUDENT_LIST_ORDER = gql`
  mutation Mutation($teacherEmail: String!, $listId: ID!, $listOrder: Int) {
    editStudentList(teacherEmail: $teacherEmail, listId: $listId, listOrder: $listOrder) {
      ok
      error
    }
  }
`;

export const DELETE_STUDENT_LIST_MUTATION = gql`
  mutation Mutation($teacherEmail: String!, $listId: ID!) {
    deleteStudentList(teacherEmail: $teacherEmail, listId: $listId) {
      ok
      error
    }
  }
`;
