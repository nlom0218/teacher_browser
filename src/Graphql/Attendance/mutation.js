import gql from "graphql-tag";

export const CREATE_ATTENDANCE_MUTATION = gql`
  mutation CreateAttendance($userEmail: String!, $studentId: String!, $type: String!, $date: Float!, $contents: String, $month: Int!) {
    createAttendance(userEmail: $userEmail, studentId: $studentId, type: $type, date: $date, contents: $contents, month: $month) {
      ok
      error
    }
  }
`

export const EDIT_ATTENDANCE_MUTATION = gql`
  mutation EditAttendance($userEmail:String! $type: String!, $date: Float!, $attendId: String!, $contents: String, $month: Int!) {
    editAttendance(userEmail: $userEmail, type: $type, date: $date, attendId: $attendId, contents: $contents, month: $month) {
      ok
      error
    }
  }
`

export const DELETE_ATTENDANCE_MUTATION = gql`
  mutation DeleteAttendance($userEmail: String!, $attendId: String!) {
    deleteAttendance(userEmail: $userEmail, attendId: $attendId) {
      ok
      error
    }
  }
`