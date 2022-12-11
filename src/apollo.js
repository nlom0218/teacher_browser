import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { makeVar } from "@apollo/client";

const FULL_SCREEN = "fullScreen";
const BG_THEME = "bgTheme";
const DARK = "dark";
const TOKEN = "token";
const POPUP = "popup";
const IS_SEE_STUDENT = "isSeeStudent";
const MENU_TYPE = "menuType";
const IS_SEE_STUDENT_LIST = "isSeeStudentList";
const BG_ANI = "bgAni";
const PAGELINK_SECTION = "pageLinkSection";
const PAGE_LINK_FOLDER = "pageLinkFolder";
const LINK_PICK_FOLDER = "linkPickFolder";

export const isFullScreenModeVar = makeVar(Boolean(localStorage.getItem(FULL_SCREEN)));
export const fullScreenMode = () => {
  localStorage.setItem(FULL_SCREEN, true);
  isFullScreenModeVar(true);
};
export const smallScreenMode = () => {
  localStorage.removeItem(FULL_SCREEN);
  isFullScreenModeVar(false);
};

export const bgThemeVar = makeVar(localStorage.getItem(BG_THEME));
export const editBgTheme = (theme) => {
  localStorage.setItem(BG_THEME, theme);
  bgThemeVar(theme);
};

export const menuTypeVar = makeVar(localStorage.getItem(MENU_TYPE));
export const setMenuType = (type) => {
  localStorage.setItem(MENU_TYPE, type);
  menuTypeVar(type);
};

export const darkModeVar = makeVar(Boolean(localStorage.getItem(DARK)));
export const enableDarkMode = () => {
  localStorage.setItem(DARK, "true");
  darkModeVar(true);
};
export const disableDarkMode = () => {
  localStorage.removeItem(DARK);
  darkModeVar(false);
};

export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));
export const logInUser = (token) => {
  localStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
};

export const logOutUser = (callback) => {
  localStorage.removeItem(TOKEN);
  isLoggedInVar(false);

  // 네이버 토근 삭제
  localStorage.removeItem("com.naver.nid.oauth.state_token");
  localStorage.removeItem("com.naver.nid.access_token");

  // 카카오 로그인 시 로그아웃
  if (window.Kakao.Auth.getAccessToken()) window.Kakao.Auth.logout(() => callback());
  else callback();
};

// 현재 상태가 파업인지 아닌지 설정하는 변수와 팝업창으로 이동하기와 벗어나기 함수
export const isPopupVar = makeVar(localStorage.getItem(POPUP));
export const inPopup = (type) => {
  localStorage.setItem(POPUP, type);
  isPopupVar(type);
};
export const outPopup = () => {
  localStorage.removeItem(POPUP);
  isPopupVar(false);
};

// 명렬표에서 학생 리스트를 보일지 숨길지 설정하는 변수
export const isSeeStudentVar = makeVar(localStorage.getItem(IS_SEE_STUDENT));
export const enableSeeStudent = () => {
  localStorage.setItem(IS_SEE_STUDENT, "true");
  isSeeStudentVar(true);
};
export const disableSeeStudent = () => {
  localStorage.removeItem(IS_SEE_STUDENT);
  isSeeStudentVar(false);
};

export const isSeeStudentListVar = makeVar(localStorage.getItem(IS_SEE_STUDENT_LIST));
export const enableSeeStudentList = () => {
  localStorage.setItem(IS_SEE_STUDENT_LIST, "true");
  isSeeStudentListVar(true);
};
export const disableSeeStudentList = () => {
  localStorage.removeItem(IS_SEE_STUDENT_LIST);
  isSeeStudentListVar(false);
};

export const bgThemeAniVar = makeVar(Boolean(localStorage.getItem(BG_ANI)));
export const enableBgThemeAni = () => {
  localStorage.setItem(BG_ANI, "true");
  bgThemeAniVar(true);
};
export const disableBgThemeAni = () => {
  localStorage.removeItem(BG_ANI);
  bgThemeAniVar(false);
};

export const pageLinkFolderVar = makeVar(localStorage.getItem(PAGE_LINK_FOLDER));
export const movePageLinkFolder = (folder) => {
  localStorage.setItem(PAGE_LINK_FOLDER, folder);
  pageLinkFolderVar(folder);
};
export const removePageLinkFolder = () => {
  localStorage.removeItem(PAGE_LINK_FOLDER);
  pageLinkFolderVar(undefined);
};
export const linkPickFolderVar = makeVar(localStorage.getItem(LINK_PICK_FOLDER));
export const moveLinkPickFolder = (folder) => {
  localStorage.setItem(LINK_PICK_FOLDER, folder);
  linkPickFolderVar(folder);
};
export const removeLinkPickFolder = () => {
  localStorage.removeItem(LINK_PICK_FOLDER);
  linkPickFolderVar(undefined);
};

export const getLocalNumbers = () => {
  return localStorage.getItem("localNumbers");
};
export const setLocalNumbers = (numbers) => {
  localStorage.setItem("localNumbers", numbers);
};
export const removeLocalNumbers = () => {
  localStorage.removeItem("localNumbers");
};
export const hasLocalNumbers = () => {
  return Boolean(localStorage.getItem("localNumbers"));
};

const httpLink = createHttpLink({
  uri:
    process.env.NODE_ENV === "production" ? "https://teachercan.herokuapp.com/graphql" : "https://api.teachercan.com",
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      token: localStorage.getItem(TOKEN) || "",
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {},
  }),
});

export const pageLinkSectionVar = makeVar(
  localStorage.getItem(PAGELINK_SECTION) ? localStorage.getItem(PAGELINK_SECTION) : "pageLink",
);
export const movePageLink = () => {
  localStorage.setItem(PAGELINK_SECTION, "pageLink");
  pageLinkSectionVar("pageLink");
};
export const moveLinkPick = () => {
  localStorage.setItem(PAGELINK_SECTION, "linkPick");
  pageLinkSectionVar("linkPick");
};
