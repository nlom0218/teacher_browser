import gql from "graphql-tag";

// 선생님의 학생 목록 모두 불러오기
// Components/Draw/Popup/StudentList.js
// Components/Draw/AllStudentList.js
// Components/List/AllList
// Components/List/DetailList
// Components/Order/Popup/StudentlList.js
// Components/Order/AllStudentList.js

// refetchQueries
// Components/List/Dorp/EmptyItem.js
// Components/List/Popup/CreateList.js
// Components/List/Popup/DeleteList.js
export const SEE_ALL_STUDENT_LIST_QUERY = gql`
  query SeeStudentList {
    seeStudentList {
      teacherEmail
      listId
      listOrder
      listName
      listIcon
    }
  }
`

export const SEE_ONE_STUDENT_LIST_QUERY = gql`
  query SeeStudentList($listId: ID) {
    seeStudentList(listId: $listId) {
      listId
      listOrder
      listName
      listIcon
      teacherEmail
      students {
        _id
        studentName
        studentGender
        studentNumber
        listId
        trash
      }
    }
  }
`