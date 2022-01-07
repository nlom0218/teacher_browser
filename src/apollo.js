import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { makeVar } from "@apollo/client"

const DARK = "dark"
const TOKEN = "token"
const POPUP = "popup"
const IS_SEE_STUDENT_LIST = "isSeeStudentList"
const MENU_TYPE = "menuType"

export const menuTypeVar = makeVar(localStorage.getItem(MENU_TYPE))
export const setMenuType = (type) => {
  localStorage.setItem(MENU_TYPE, type)
  menuTypeVar(type)
}

export const darkModeVar = makeVar(Boolean(localStorage.getItem(DARK)))
export const enableDarkMode = () => {
  localStorage.setItem(DARK, "true")
  darkModeVar(true)
}
export const disableDarkMode = () => {
  localStorage.removeItem(DARK)
  darkModeVar(false)
}

export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)))
export const logInUser = (token) => {
  localStorage.setItem(TOKEN, token)
  isLoggedInVar(true)
}
export const logOutUser = () => {
  localStorage.removeItem(TOKEN)
  isLoggedInVar(false)
}

// 현재 상태가 파업인지 아닌지 설정하는 변수와 팝업창으로 이동하기와 벗어나기 함수
export const isPopupVar = makeVar(localStorage.getItem(POPUP))
export const inPopup = (type) => {
  localStorage.setItem(POPUP, type)
  isPopupVar(type)
}
export const outPopup = () => {
  localStorage.removeItem(POPUP)
  isPopupVar(false)
}

// 명렬표에서 학생 리스트를 보일지 숨길지 설정하는 변수
export const isSeeStudentListVar = makeVar(localStorage.getItem(IS_SEE_STUDENT_LIST))
export const enableSeeStudentList = () => {
  localStorage.setItem(IS_SEE_STUDENT_LIST, "true")
  isSeeStudentListVar(true)
}
export const disableSeeStudentList = () => {
  localStorage.removeItem(IS_SEE_STUDENT_LIST)
  isSeeStudentListVar(false)
}

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
})

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      token: localStorage.getItem(TOKEN) || ""
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