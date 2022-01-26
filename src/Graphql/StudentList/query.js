import gql from "graphql-tag";

// 선생님의 명렬표 모두 불러오기
// Components/Draw/Popup/StudentList.js
// Components/Draw/AllStudentList.js
// Components/List/AllList.js
// Components/List/DetailList.js
// Components/Order/Popup/StudentlList.js
// Components/Order/AllStudentList.js

// refetchQueries
// Components/List/Dorp/EmptyItem.js
// Components/List/Popup/CreateList.js
// Components/List/Popup/DeleteList.js
// Components/Journal/MainArea.js
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
`;

// 전달받은 아이디를 가지는 명렬표를 불러오기(필요한 인자 => listId)
// Components/List/DetailList.js

// refetchQueries
// Components/List/Dorp/CenterDndContainer.js
// Components/List/Popup/AddManyStudent.js
// Components/List/DetailList.js
// Components/List/StudentInItem.js
// Components/Journal/Sub-Area/InputArea.js
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
        journal
      }
    }
  }
`;
