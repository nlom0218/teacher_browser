import gql from "graphql-tag";

export const CREATE_PAGE_LINK_MUTATION = gql`
  mutation CreatePageLink($pageTitle: String!, $pageDescription: String!, $pageURL: String!, $folder: [String]!, $type: String) {
    createPageLink(pageTitle: $pageTitle, pageDescription: $pageDescription, pageURL: $pageURL, folder: $folder, type: $type) {
      ok
      error
    }
  }
`