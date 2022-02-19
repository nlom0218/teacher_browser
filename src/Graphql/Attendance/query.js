import gql from "graphql-tag";

export const SEE_ATTENDANCE_QUERY = gql`
  query SeeAttendance($studentId: String, $date: Float, $attendId: String) {
    seeAttendance(studentId: $studentId, date: $date, attendId: $attendId) {
      _id
      userEmail
      studentId
      type
      date
      contents
    }
  }
`