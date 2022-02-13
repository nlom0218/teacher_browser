import gql from "graphql-tag";

export const SEE_JOURNAL_QUERY = gql`
  query SeeJournal($teacherEmail: String!, $date: String, $studentId: ID) {
    seeJournal(teacherEmail: $teacherEmail, date: $date, studentId: $studentId) {
      _id
      ownerId
      date
      text
      teacherEmail
    }
  }
`