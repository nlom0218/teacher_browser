import gql from "graphql-tag";

export const SEE_TO_DO_LIST_QUERY = gql`
  query SeeToDoList($isComplete: Boolean, $id: String) {
    seeToDoList(isComplete: $isComplete, id: $id) {
      _id
      toDo
      userEmail
      contents
      isComplete
      startDate
      endDate
      ingToDo
      notToDo
      inComingToDo
      star
    }
  }
`