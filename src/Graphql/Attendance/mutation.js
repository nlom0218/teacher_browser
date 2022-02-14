import gql from "graphql-tag";

export const CREATE_ATTENDANCE_MUTATION = gql`
  mutation CreateAttendance($userEmail: String!, $studentId: String!, $type: String!, $date: String!, $contents: String) {
    createAttendance(userEmail: $userEmail, studentId: $studentId, type: $type, date: $date, contents: $contents) {
      ok
      error
    }
  }
`