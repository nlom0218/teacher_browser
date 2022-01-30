import gql from "graphql-tag";

export const WRITE_JOURNAL_MUTATION = gql`
  mutation writeJournal($userEmail: ID!, $ownerId: ID!, $contents: String) {
    writeJournal(userEmail: $userEmail, ownerId: $ownerId, contents: $contents) {
      ok
      error
    }
  }
`;

export const DELETE_JOURNAL_MUTATION = gql`
  mutation deleteJournal($userEmail: ID!, $ownerId: ID!, $index: Int) {
    deleteJournal(userEmail: $userEmail, ownerId: $ownerId, index: $index) {
      ok
      error
    }
  }
`;
