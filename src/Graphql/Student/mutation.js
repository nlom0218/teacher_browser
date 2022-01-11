import gql from "graphql-tag";

export const EDIT_STUDENT_MUTATION = gql`
mutation Mutation(
  $teacherEmail: String!,
  $studentId: ID!,
  $studentName: String,
  $studentNumber: String,
  $studentGender: String,
  $parentPhoneNum: String, 
  $allergy: [Int], 
  $tag: [String], 
  $delTag: String,
  $trash: Boolean) {
  editStudent(
    teacherEmail: $teacherEmail, 
    studentId: $studentId, 
    studentName: $studentName, 
    studentNumber: $studentNumber,
    studentGender: $studentGender, 
    parentPhoneNum: $parentPhoneNum, 
    allergy: $allergy, 
    tag: $tag, 
    delTag: $delTag,
    trash: $trash) {
      ok
      error
  }
}
`

export const CREATE_STUDENT_MUTATION = gql`
    mutation CreateStudent($teacherEmail: String!, $studentString: String!) {
    createStudent(teacherEmail: $teacherEmail, studentString: $studentString) {
      ok
      error
    }
  }
`


export const DELETE_STUDENT_MUTATION = gql`
  mutation DeleteStudent($teacherEmail: String!, $studentId: ID!, $disconnectOnly: Boolean!, $listId: ID) {
    deleteStudent(teacherEmail: $teacherEmail, studentId: $studentId, disconnectOnly: $disconnectOnly, listId: $listId) {
      ok
      error
    }
  }
`