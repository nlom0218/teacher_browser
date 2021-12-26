import React from 'react';
import { useReactiveVar } from '@apollo/client';
import { Route, Routes } from "react-router-dom"
import { ThemeProvider } from 'styled-components';
import { darkModeVar } from './apollo';
import { darkTheme, GlobalStyle, ligthTheme } from './styles';
import Home from './Pages/Home'
import Calendar from './Pages/Calendar';
import PageLink from './Pages/PageLink';
import TodoList from './Pages/TodoList';
import Menu from './Pages/Menu'
import routes from './routes';
import Timer from './Pages/Timer';
import Draw from './Pages/Draw';
import Swap from './Pages/Swap'
import Order from './Pages/Order';
import Lunchmenu from './Pages/Lunchmenu';
import Schedule from './Pages/Schedule';
import Journal from './Pages/Journal';
import EditAccount from './Pages/EditAccount';
import Login from './Pages/Login';
import CreateAccount from './Pages/CreateAccount';
import NaverLoginCallBack from './Pages/NaverLoginCallBack';
import useMe from './Hooks/useMe';
import HeaderWeather from './Components/Shared/HeaderWeather';
import useMedia from './Hooks/useMedia';
import List from './Pages/List';
import ListItem from './Pages/ListItem';

function App() {
  const darkMode = useReactiveVar(darkModeVar);
  const media = useMedia();

  // me 값을 불러오는데 시간이 걸려서 bgTheme의 디폴트 값으로 설정된 nature가 불려오다가 수정됨...
  // useMe() 값을 다 불러온 뒤에 return할 수 있을까?
  const me = useMe();

  return (
    <ThemeProvider theme={darkMode ? darkTheme : ligthTheme}>
      <GlobalStyle bgTheme={me?.bgTheme} />
      {media !== "Mobile" && <HeaderWeather />}
      <Routes>
        <Route path={routes.home} element={<Home />} />
        <Route path={routes.login} element={<Login />} />
        <Route path={routes.createAccount} element={<CreateAccount />} />
        <Route
          path={routes.naverLoginCallBack}
          element={<NaverLoginCallBack />}
        />
        <Route path={routes.editAccount} element={<EditAccount />} />
        <Route path={routes.todo} element={<TodoList />} />
        <Route path={routes.calendar} element={<Calendar />} />
        <Route path={routes.pageLink} element={<PageLink />} />
        <Route path={routes.menu} element={<Menu />} />
        <Route path={routes.timer} element={<Timer />} />
        <Route path={routes.draw} element={<Draw />} />
        <Route path={routes.swap} element={<Swap />} />
        <Route path={routes.order} element={<Order />} />
        <Route path={routes.lunchmenu} element={<Lunchmenu />} />
        <Route path={routes.schedule} element={<Schedule />} />
        <Route path={routes.journal} element={<Journal />} />
        <Route path={routes.list} element={<List />} />
        <Route path={`${routes.list}/:order`} element={<ListItem />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
