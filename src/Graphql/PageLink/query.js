import gql from "graphql-tag";

export const SEE_PAGE_LINK_QUERY = gql`
  query SeePageLink($folder: String, $pageTitle: String) {
    seePageLink(folder: $folder, pageTitle: $pageTitle) {
      _id
      pageTitle
      pageDescription
      pageURL
      folder
      type
      updateAt
    }
  }
`