import gql from "graphql-tag";

export const WRITE_JOURNAL_MUTATION = gql`
  mutation writeJournal($userEmail: ID!, $ownerId: ID!, $contents: String) {
    writeJournal(userEmail: $userEmail, ownerId: $ownerId, contents: $contents) {
      ok
      error
    }
  }
`;
