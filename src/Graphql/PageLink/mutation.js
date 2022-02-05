import { gql } from "@apollo/client";

export const EDIT_PAGE_LINK_MEMO_MUTATION = gql`
  mutation EditPageLinkMemo(
    $userEmail: String!
    $memo: String!
    $pageTitle: String!
  ) {
    editPageLinkMemo(
      userEmail: $userEmail
      memo: $memo
      pageTitle: $pageTitle
    ) {
      ok
      error
    }
  }
`;
