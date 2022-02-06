import gql from "graphql-tag";

export const CREATE_TO_DO_LIST_MUTATION = gql`
  mutation CreateToDoList($toDo: String!, $userEmail: String!, $startDate: String, $endDate: String, $contents: String, $star: Int) {
    createToDoList(toDo: $toDo, userEmail: $userEmail, startDate: $startDate, endDate: $endDate, contents: $contents, star: $star) {
      ok
      error
    }
  }
`

export const EDIT_TO_DO_LIST_MUTATION = gql`
  mutation EditToDoList($id: ID!, $userEmail: String!, $toDo: String, $isComplete: Boolean, $startDate: String, $endDate: String, $contents: String) {
    editToDoList(_id: $id, userEmail: $userEmail, toDo: $toDo, isComplete: $isComplete, startDate: $startDate, endDate: $endDate, contents: $contents) {
      ok
      error
    }
  }
`

export const COMPLETE_TO_DO_LIST_MUTATION = gql`
  mutation CompleteToDoList($id: ID!, $userEmail: String!) {
    completeToDoList(_id: $id, userEmail: $userEmail) {
      error
      ok
    }
  }
`
