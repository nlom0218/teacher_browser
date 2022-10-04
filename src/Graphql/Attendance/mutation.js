import gql from "graphql-tag";

// export const CREATE_ATTENDANCE_MUTATION = gql`
//   mutation CreateAttendance(
//     $userEmail: String!
//     $studentId: String!
//     $type: String!
//     $date: Float!
//     $contents: String
//     $month: Int!
//   ) {
//     createAttendance(
//       userEmail: $userEmail
//       studentId: $studentId
//       type: $type
//       date: $date
//       contents: $contents
//       month: $month
//     ) {
//       ok
//       error
//     }
//   }
// `;

export const CREATE_ATTENDANCE_MUTATION = gql`
  mutation CreateAttendance(
    $userEmail: String!
    $studentId: [String!]!
    $type: String!
    $contents: String
    $dateMonthArr: [DateMonth]!
  ) {
    createAttendance(
      userEmail: $userEmail
      studentId: $studentId
      type: $type
      contents: $contents
      dateMonthArr: $dateMonthArr
    ) {
      _id
      userEmail
      studentId
      type
      date
      month
      contents
      studentName
    }
  }
`;

export const CREATE_MANY_ATTENDANCE_MUTATION = gql`
  mutation CreateManyAttendance(
    $userEmail: String!
    $studentId: String!
    $type: String!
    $dateMonthArr: [DateMonth]!
    $contents: String
  ) {
    createManyAttendance(
      userEmail: $userEmail
      studentId: $studentId
      type: $type
      dateMonthArr: $dateMonthArr
      contents: $contents
    ) {
      ok
      error
    }
  }
`;

export const EDIT_ATTENDANCE_MUTATION = gql`
  mutation EditAttendance(
    $userEmail: String!
    $type: String!
    $date: Float!
    $attendId: String!
    $contents: String
    $month: Int!
  ) {
    editAttendance(
      userEmail: $userEmail
      type: $type
      date: $date
      attendId: $attendId
      contents: $contents
      month: $month
    ) {
      ok
      error
    }
  }
`;

export const DELETE_ATTENDANCE_MUTATION = gql`
  mutation DeleteAttendance($userEmail: String!, $attendId: String!) {
    deleteAttendance(userEmail: $userEmail, attendId: $attendId) {
      ok
      error
    }
  }
`;
