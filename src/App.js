import { useReactiveVar } from '@apollo/client';
import React from 'react';
import { Route, Routes } from "react-router-dom"
import { ThemeProvider } from 'styled-components';
import { darkModeVar } from './apollo';
import Calendar from './Pages/Calendar';
import Home from './Pages/Home';
import Menu from './Pages/Menu';
import PageLink from './Pages/PageLink';
import TodoList from './Pages/TodoList';
import routes from './routes';
import { darkTheme, GlobalStyle, ligthTheme } from './styles';

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
      </Routes>
    </ThemeProvider>
  );
}

export default App;
