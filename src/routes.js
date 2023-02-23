const HOME = "/";
const TODO = "/todo";
const CALENDAR = "/calendar";
const MENU = "/menu";
const ATTEND = "/attend";

// menu link
const PAGELINK = "/pageLink";
const TIMER = "/timer";
const TIMER_POPUP = "/timer_popup";
const DRAW = "/draw";
const SWAP = "/swap";
const ORDER = "/order";
const LUNCHMENU = "/lunchmenu";
const SCHEDULE = "/schedule";
const JOURNAL = "/journal";
const LIST = "/list";
const NEWS = "/news";
const MANAGINGROLES = "/managingRoles";
const FAMILYMONTH = "/family-month";
const QRCODE = "/qrcode";
const QRCODE_RESULT = "/qrcode_result";
const QRCODE_POPUP = "/qrcode_popup";
const QRCODE_STORAGE = "/qrcode_storage";
const XMAS_TREE = "/XmasTree";
const WISH_CARD = "/WishCard";
const ROLES = "/roles";
const ROLES_SETTING = "/rolesSetting";

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
  menu: MENU,
  attend: ATTEND,

  // menu link
  pageLink: PAGELINK,
  timer: TIMER,
  timerPopup: TIMER_POPUP,
  draw: DRAW,
  swap: SWAP,
  order: ORDER,
  lunchmenu: LUNCHMENU,
  schedule: SCHEDULE,
  journal: JOURNAL,
  list: LIST,
  news: NEWS,
  managingRoles: MANAGINGROLES,
  familyMonth: FAMILYMONTH,
  qrcode: QRCODE,
  qrcodeResult: QRCODE_RESULT,
  qrcodePopup: QRCODE_POPUP,
  qrcodeStorage: QRCODE_STORAGE,
  xmasTree: XMAS_TREE,
  wishCard: WISH_CARD,
  roles: ROLES,
  rolesSetting: ROLES_SETTING,

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
