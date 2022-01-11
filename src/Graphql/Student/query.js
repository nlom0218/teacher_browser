import gql from "graphql-tag";

export const SEE_ALL_STUDENT_QUERY = gql`
  query Query($tag: [String], $sort: String) {
    seeAllStudent(tag: $tag, sort: $sort) {
      _id
      teacherEmail
      studentName
      studentNumber
      listId
      tag
      trash
    } 
  }
`

export const SEE_ONE_STUDENT_QUERY = gql`
  query SeeAllStudent($studentId: ID, $allergy: Int) {
    seeAllStudent(studentId: $studentId, allergy: $allergy) {
      _id
      teacherEmail
      studentName
      studentNumber
      studentGender
      parentPhoneNum
      allergy
      tag
      trash
    }
  }
`