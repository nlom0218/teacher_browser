import gql from "graphql-tag";

export const SEE_JOURNAL_QUERY = gql`
  query SeeJournal($teacherEmail: String!, $date: Float, $studentId: ID, $journalId: String) {
    seeJournal(teacherEmail: $teacherEmail, date: $date, studentId: $studentId, journalId: $journalId) {
      _id
      ownerId
      date
      text
      teacherEmail
    }
  }
`