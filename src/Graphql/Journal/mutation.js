import gql from "graphql-tag";

export const WRITE_JOURNAL_MUTATION = gql`
  mutation writeJournal($userEmail: ID!, $ownerId: ID!, $date: String, $text: String) {
    writeJournal(userEmail: $userEmail, ownerId: $ownerId, date: $date, text: $text) {
      ok
      error
    }
  }
`;

export const DELETE_JOURNAL_MUTATION = gql`
  mutation deleteJournal($userEmail: ID!, $journalId: ID) {
    deleteJournal(userEmail: $userEmail, journalId: $journalId) {
      ok
      error
    }
  }
`;

export const EDIT_JOURNAL_MUTATION = gql`
  mutation editJournal($userEmail: ID!, $journalId: ID, $date: String, $text: String) {
    editJournal(userEmail: $userEmail, journalId: $journalId, date: $date, text: $text) {
      ok
      error
    }
  }
`;
