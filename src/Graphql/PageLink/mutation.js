import gql from "graphql-tag";

export const CREATE_PAGE_LINK_MUTATION = gql`
  mutation CreatePageLink($pageTitle: String!, $pageDescription: String!, $pageURL: String!, $folder: [String]!, $type: String) {
    createPageLink(pageTitle: $pageTitle, pageDescription: $pageDescription, pageURL: $pageURL, folder: $folder, type: $type) {
      ok
      error
    }
  }
`

export const UPDATE_PAGE_LINK_MUTATION = gql`
  mutation Mutation($pageTitle: String!, $pageDescription: String, $folder: [String]) {
    updatePageLink(pageTitle: $pageTitle, pageDescription: $pageDescription, folder: $folder) {
      ok
      error
    }
  }
`

export const DELETE_PAGE_LINK_MUTATION = gql`
  mutation DeletePageLink($pageTitle: String!) {
    deletePageLink(pageTitle: $pageTitle) {
      ok
      error
    }
  }
`

export const EDIT_PAGE_LINK_MEMO_MUTATION = gql`
  mutation EditPageLinkMemo($userEmail: String!, $memo: String!, $pageTitle: String!) {
    editPageLinkMemo(userEmail: $userEmail, memo: $memo, pageTitle: $pageTitle) {
      ok
      error
    }
  }
`
