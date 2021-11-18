import React from 'react';
import { useReactiveVar } from '@apollo/client';
import { Route, Routes } from "react-router-dom"
import { ThemeProvider } from 'styled-components';
import { darkModeVar } from './apollo';
import { darkTheme, GlobalStyle, ligthTheme } from './styles';
import Home from './Pages/Home/Home'
import Calendar from './Pages/Calendar/Calendar';
import PageLink from './Pages/PageLink/PageLink';
import TodoList from './Pages/TodoList/TodoList';
import Menu from './Pages/Menu/Menu'
import routes from './routes';
import Timer from './Pages/Timer/Timer';
import Draw from './Pages/Draw/Draw';
import Swap from './Pages/Swap/Swap'
import Order from './Pages/Order/Order';
import Lunchmenu from './Pages/Lunchmenu/Lunchmenu';
import Schedule from './Pages/Schedule/Schedule';
import Journal from './Pages/Journal/Journal';

function App() {
  const darkMode = useReactiveVar(darkModeVar)
  return (
    <ThemeProvider theme={darkMode ? darkTheme : ligthTheme}>
      <GlobalStyle />
      <Routes>
        <Route path={routes.home} element={<Home />} />
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
      </Routes>
    </ThemeProvider>
  );
}

export default App;
