import gql from "graphql-tag";

// 학생 목록에 있는 모든 학생 보이기(필요한 인자 => tag, sort, trash:false)
// Components/List/Popup/AddManyStudent.js
// Components/List

// refetchQueries
// Components/List/Dorp/Trash.js
// Components/List/Popup/CreateStudent.js
// Components/List/Popup/DeleteStudent.js
// Components/List/DetailStudent.js
// Components/List/DetailStudentNumber.js
// Components/List/DetailStudentTag.js
// Components/Trash/StudentInTrash.js
// Components/Trash/Popup/RestoreAllStudent.js
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
`;

// 휴지통 목록에 있는 학생 목록(필요한 인자 => trash:true)
// Pages/Trash.js

// refetchQueries
// Components/List/Dorp/Trash.js
// Components/List/Popup/DeleteStudent.js
// Components/Trash/StudentInTrash.js
// Components/List/DetailStudentNumber.js
// Components/List/DetailStudentTag.js
// Components/Trash/Popup/RestoreAllStudent.js
export const SEE_ALL_STUDENT_IN_TRASH_QUERY = gql`
  query Query($trash: Boolean) {
    seeAllStudent(trash: $trash) {
      _id
      teacherEmail
      studentName
      studentNumber
      listId
      tag
      trash
    }
  }
`;

// 학생 세부 정보에서 쓰이는 학생 한명만 불러오는 쿼리(필요한 인자 => studentId)
// Compnents/DetailStudent.js

// refetchQueries
// Components/Popup/CreateTag.js
// Components/List/DetailStudentAllergy.js
// Components/List/DetailStudentNumber.js
// Components/List/DetailStudentTag.js
// Components/List/DetailStudentMemo.js
export const SEE_ONE_STUDENT_QUERY = gql`
  query SeeAllStudent($studentId: ID, $allergy: Int) {
    seeAllStudent(studentId: $studentId, allergy: $allergy) {
      _id
      teacherEmail
      studentName
      studentNumber
      studentGender
      memo
      allergy
      tag
      trash
      journal
    }
  }
`;

// 해당 알러지가 있는 학생들만 불러오기(필요하 인자 => allergy)
// Components/Lunchmenu/SeeAllergy.js
export const SEE_ALLERGY_STUDENT_QUERY = gql`
  query SeeAllStudent($allergy: Int) {
    seeAllStudent(allergy: $allergy) {
      _id
      teacherEmail
      studentName
      studentNumber
      studentGender
      memo
      allergy
      tag
      trash
    }
  }
`;
