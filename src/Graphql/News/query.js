import gql from "graphql-tag";

export const GET_NEWS_QUERY = gql`
  query getNews($search: String!, $start: Int!, $sort: String!) {
    getNews(search: $search, start: $start, sort: $sort) {
      title
      link
      pubDate
      description
    }
  }
`;
