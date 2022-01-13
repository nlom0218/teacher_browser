import gql from "graphql-tag";

// 학생 목록에 있는 모든 학생 보이기(필요한 인자: tag, sort, trash)
// Components/List/Popup/AddManyStudent.js
// Components/List/Popup/SeeStudents.js
export const SEE_ALL_STUDENT_QUERY = gql`
  query Query($tag: [String], $sort: String, $trash: Boolean) {
    seeAllStudent(tag: $tag, sort: $sort, trash: $trash) {
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