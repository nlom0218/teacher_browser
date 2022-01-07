import gql from "graphql-tag";

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
      }
    }
  }
`