import gql from "graphql-tag";

export const SEE_TO_DO_LIST_QUERY = gql`
  query SeeToDoList($isComplete: Boolean) {
    seeToDoList(isComplete: $isComplete) {
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
    }
  }
`