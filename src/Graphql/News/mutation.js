import gql from "graphql-tag";

export const SET_FAVORITE_NEWS_MUTATION = gql`
  mutation setFavoriteNews($news: String!, $userEmail: String!) {
    setFavoriteNews(news: $news, userEmail: $userEmail) {
      ok
      error
    }
  }
`