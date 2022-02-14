import gql from "graphql-tag";

export const SEE_ATTENDANCE_QUERY = gql`
  query SeeAttendance($studentId: String, $date: String) {
    seeAttendance(studentId: $studentId, date: $date) {
      userEmail
      studentId
      type
      date
      contents
    }
  }
`