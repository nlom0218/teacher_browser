import gql from "graphql-tag";

export const SEE_TO_DO_LIST_QUERY = gql`
  query SeeToDoList($isComplete: Boolean, $id: String, $date: Float) {
    seeToDoList(isComplete: $isComplete, id: $id, date: $date) {
      _id
      toDo
      userEmail
      contents
      isComplete
      startDate
      endDate
      star
    }
  }
`

export const SEE_TO_DO_LIST_ONLY_LENGTH_QUERY = gql`
  query Query($userEmail: String!, $date: Float) {
    seeToDoListOnlyLength(userEmail: $userEmail, date: $date)
  } 
`