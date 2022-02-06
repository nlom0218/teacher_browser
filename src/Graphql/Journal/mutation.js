import gql from "graphql-tag";

export const WRITE_JOURNAL_MUTATION = gql`
  mutation writeJournal($userEmail: ID!, $ownerId: ID!, $contents: Contents) {
    writeJournal(userEmail: $userEmail, ownerId: $ownerId, contents: $contents) {
      ok
      error
    }
  }
`;

export const DELETE_JOURNAL_MUTATION = gql`
  mutation deleteJournal($userEmail: ID!, $ownerId: ID!, $journalId: ID) {
    deleteJournal(userEmail: $userEmail, ownerId: $ownerId, journalId: $journalId) {
      ok
      error
    }
  }
`;

export const EDIT_JOURNAL_MUTATION = gql`
  mutation editJournal($userEmail: ID!, $ownerId: ID!, $journalId: ID, $contents: Contents) {
    editJournal(userEmail: $userEmail, ownerId: $ownerId, journalId: $journalId, contents: $contents) {
      ok
      error
    }
  }
`;
