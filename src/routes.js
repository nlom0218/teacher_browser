const HOME = "/";
const TODO = "/todo";
const CALENDAR = "/calendar";
const PAGELINK = "/pageLink";
const MENU = "/menu";

// menu link
const TIMER = "/timer";
const DRAW = "/draw";
const SWAP = "/swap";
const ORDER = "/order";
const LUNCHMENU = "/lunchmenu";
const SCHEDULE = "/schedule";
const JOURNAL = "/journal";
const LIST = "/list";
const NEWS = "/news";
const MANAGINGROLES = "/managingRoles";

// account link
const LOGIN = "/login";
const EDITACCOUNT = "/edit-account";
const NAVERLOGINCALLBACK = "/naverLogin";
const GOOGLELOGINCALLBACK = "/googleLogin";
const KAKAOLOGINCALLBACK = "/kakaoLogin";
const FINDPASSWORD = "/find-password";
const FAKE_CREATEACCOUNT = "/fake-create-account";
const FAKE_LOGIN = "/fake-login";
const AGREE_POLICY = "/agreePolicy";

const TRASH = "/trash";

const PAGE_LINK_REGISTER = "/pageLink-register";
const PAGE_LINK_ALLLIST = "/pageLink-allList";

const routes = {
  home: HOME,
  todo: TODO,
  calendar: CALENDAR,
  pageLink: PAGELINK,
  menu: MENU,

  // menu link
  timer: TIMER,
  draw: DRAW,
  swap: SWAP,
  order: ORDER,
  lunchmenu: LUNCHMENU,
  schedule: SCHEDULE,
  journal: JOURNAL,
  list: LIST,
  news: NEWS,
  managingRoles: MANAGINGROLES,

  // account link
  login: LOGIN,
  createAccount: FAKE_CREATEACCOUNT,
  editAccount: EDITACCOUNT,
  naverLoginCallBack: NAVERLOGINCALLBACK,
  googleLoginCallBack: GOOGLELOGINCALLBACK,
  kakaoLoginCallBack: KAKAOLOGINCALLBACK,
  findPassword: FINDPASSWORD,
  fakeLogin: FAKE_LOGIN,
  agreePolicy: AGREE_POLICY,

  trash: TRASH,

  pageLinkRegister: PAGE_LINK_REGISTER,
  pageLinkAllList: PAGE_LINK_ALLLIST,
};

export default routes;
