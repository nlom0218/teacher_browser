import gql from "graphql-tag";

export const SEE_ALL_STUDENT_QUERY = gql`
  query Query {
    seeAllStudent {
      _id
      teacherEmail
      studentName
      listId
    } 
  }
`

export const SEE_ONE_STUDENT_QUERY = gql`
  query SeeAllStudent($studentId: ID) {
    seeAllStudent(studentId: $studentId) {
      _id
      teacherEmail
      studentName
      studentOrder
      studentGender
      parentPhoneNum
      allergy
      tag
    }
  }
`