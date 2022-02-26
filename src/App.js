import React, { useEffect, useState } from "react";
import { useReactiveVar } from "@apollo/client";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { darkModeVar, disableBgThemeAni, isPopupVar, isLoggedInVar, bgThemeVar, editBgTheme } from "./apollo";
import { darkTheme, GlobalStyle, ligthTheme } from "./styles";
import Calendar from "./Pages/Calendar";
import PageLink from "./Pages/PageLink";
import TodoList from "./Pages/TodoList";
import Menu from "./Pages/Menu";
import routes from "./routes";
import Draw from "./Pages/Draw";
import Swap from "./Pages/Swap";
import Order from "./Pages/Order";
import Lunchmenu from "./Pages/Lunchmenu";
import Schedule from "./Pages/Schedule";
import Journal from "./Pages/Journal";
import EditAccount from "./Pages/EditAccount";
import Login from "./Pages/Login";
import FakeLogin from "./Pages/FakeLogin"
import CreateAccount from "./Pages/CreateAccount";
import NaverLoginCallBack from "./Pages/NaverLoginCallBack";
import GoogleLoginCallBack from "./Pages/GoogleLoginCallBack";
import KakaoLoginCallBack from "./Pages/KakaoLoginCallBack";
import useMe from "./Hooks/useMe";
import HeaderWeather from "./Components/Shared/HeaderWeather";
import useMedia from "./Hooks/useMedia";
import List from "./Pages/List";
import Trash from "./Pages/Trash";
import FindPassword from "./Pages/FindPassword";
import Welcome from "./Pages/Welcome";
import ChangBackground from "./Components/Shared/ChangBackground";
import PageLinkRegister from "./Pages/PageLinkRegister";
import PageLinkAllList from "./Pages/PageLinkAllList";
import PageLinkDetail from "./Pages/PageLinkDetail";
import TimerSecond from "./Pages/TimerSecond";
import { stopMusicFn } from "./audio/BackgroundMusic/BackgroundMusic";
import AgreePolicy from "./Pages/AgreePolicy";

function App() {
  const darkMode = useReactiveVar(darkModeVar);
  const bgTheme = useReactiveVar(bgThemeVar)

  const media = useMedia();

  const navigate = useNavigate();
  const isPopup = useReactiveVar(isPopupVar);

  // me 값을 불러오는데 시간이 걸려서 bgTheme의 디폴트 값으로 설정된 nature가 불려오다가 수정됨...
  // useMe() 값을 다 불러온 뒤에 return할 수 있을까?
  const me = useMe();
  const [userBgTheme, setUserBgTheme] = useState(undefined);

  const [screen, setScreen] = useState("small")

  // timer 오디오 없애기 위함...
  const pathname = window.location.pathname;
  const [bgMusicMp3, setBgMusicMp3] = useState(undefined);

  const isLoggedIn = useReactiveVar(isLoggedInVar);

  useEffect(() => {
    if ("" + bgTheme.substr(0, 1) === "#") {
      const changBg = setTimeout(() => {
        setUserBgTheme(bgTheme);
      }, [1800]);
      return () => {
        clearTimeout(changBg);
      };
    } else {
      setUserBgTheme(bgTheme);
    }
  }, [bgTheme]);

  useEffect(() => {
    window.Kakao.init(process.env.REACT_APP_KAKAO_API_KEY);
    disableBgThemeAni();
  }, []);

  useEffect(() => {
    if (pathname !== "/timer/countup") {
      if (bgMusicMp3) {
        stopMusicFn(bgMusicMp3);
      }
    }
    if (pathname !== "/timer/countdown") {
      if (bgMusicMp3) {
        stopMusicFn(bgMusicMp3);
      }
    }
  }, [pathname]);

  useEffect(() => {
    if (me) {
      editBgTheme(me?.bgTheme)
    } else {
      editBgTheme("nature")
    }
    if (me === undefined) {
      return
    } else if (me.agreePolicy === true) {
      return
    } else {
      navigate(routes.agreePolicy)
    }
  }, [me])

  return (
    <ThemeProvider theme={darkMode ? darkTheme : ligthTheme}>
      <GlobalStyle bgTheme={userBgTheme ? userBgTheme : me?.bgTheme} isLoggedIn={isLoggedIn} />
      <ChangBackground />
      {media !== "Mobile" && (screen === "small" && <HeaderWeather />)}
      <Routes>
        {/* <Route path={routes.home} element={<Home />} /> */}
        <Route path={routes.home} element={<Welcome />} />
        <Route path={routes.login} element={<Login />} />
        <Route path={routes.fakeLogin} element={<FakeLogin />} />
        <Route path={routes.agreePolicy} element={<AgreePolicy />} />
        <Route path={routes.createAccount} element={<CreateAccount />} />
        <Route path={routes.naverLoginCallBack} element={<NaverLoginCallBack />} />
        <Route path={routes.googleLoginCallBack} element={<GoogleLoginCallBack />} />
        <Route path={routes.kakaoLoginCallBack} element={<KakaoLoginCallBack />} />
        <Route path={routes.editAccount} element={<EditAccount />} />
        <Route path={routes.todo} element={<TodoList />} />
        <Route path={`${routes.todo}/:id`} element={<TodoList />} />
        <Route path={routes.calendar} element={<Calendar screen={screen} setScreen={setScreen} />} />
        <Route path={`${routes.calendar}/:date`} element={<Calendar screen={screen} setScreen={setScreen} />} />
        <Route path={routes.pageLink} element={<PageLink />} />
        <Route path={routes.menu} element={<Menu />} />
        <Route path={`${routes.timer}/:mode`} element={<TimerSecond bgMusicMp3={bgMusicMp3} setBgMusicMp3={setBgMusicMp3} screen={screen} setScreen={setScreen} />} />
        <Route path={routes.draw} element={<Draw />} />
        <Route path={`${routes.draw}/:id`} element={<Draw />} />
        <Route path={routes.swap} element={<Swap />} />
        <Route path={`${routes.swap}/:id`} element={<Swap />} />
        <Route path={routes.order} element={<Order />} />
        <Route path={`${routes.order}/:id`} element={<Order />} />
        <Route path={routes.lunchmenu} element={<Lunchmenu />} />
        <Route path={routes.schedule} element={<Schedule />} />
        <Route path={routes.journal} element={<Journal me={me} />} />
        <Route path={`${routes.journal}/:type/:id`} element={<Journal me={me} />} />
        <Route path={routes.list} element={<List />} />
        <Route path={`${routes.list}/:type/:id`} element={<List />} />
        <Route path={routes.trash} element={<Trash />} />
        <Route path={routes.findPassword} element={<FindPassword />} />
        <Route path={routes.pageLinkRegister} element={<PageLinkRegister />} />
        <Route path={routes.pageLinkAllList} element={<PageLinkAllList />} />
        <Route path={`${routes.pageLink}/:pageTitle`} element={<PageLinkDetail />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
