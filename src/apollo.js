import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { makeVar } from "@apollo/client"

const DARK = "dark"

export const darkModeVar = makeVar(Boolean(localStorage.getItem(DARK)))
export const enableDarkMode = () => {
  localStorage.setItem(DARK, "true")
  darkModeVar(true)
}
export const disableDarkMode = () => {
  localStorage.removeItem(DARK)
  darkModeVar(false)
}


const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
})

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
    }
  }
})


export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {

    }
  })
})