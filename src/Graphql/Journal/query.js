import gql from "graphql-tag";

export const SEE_JOURNAL_QUERY = gql`
  query SeeJournal($date: Float, $studentId: ID, $journalId: String) {
    seeJournal(date: $date, studentId: $studentId, journalId: $journalId) {
      _id
      ownerId
      date
      text
      teacherEmail
    }
  }
`