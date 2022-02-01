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
  mutation deleteJournal($userEmail: ID!, $ownerId: ID!, $index: Int) {
    deleteJournal(userEmail: $userEmail, ownerId: $ownerId, index: $index) {
      ok
      error
    }
  }
`;

export const EDIT_JOURNAL_MUTATION = gql`
  mutation editJournal($userEmail: ID!, $ownerId: ID!, $index: Int, $contents: Contents) {
    editJournal(userEmail: $userEmail, ownerId: $ownerId, index: $index, contents: $contents) {
      ok
      error
    }
  }
`;
