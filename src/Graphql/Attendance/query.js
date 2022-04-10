import gql from "graphql-tag";

export const SEE_ATTENDANCE_QUERY = gql`
  query SeeAttendance($studentId: String, $date: Float, $attendId: String, $month: Int) {
    seeAttendance(studentId: $studentId, date: $date, attendId: $attendId, month: $month) {
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
`