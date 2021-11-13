import React from 'react';
import { Route, Routes } from "react-router-dom"
import Home from './Pages/Home';
import { GlobalStyle } from './styles';

function App() {
  return (
    <React.Fragment>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
