import { ApolloProvider } from '@apollo/client';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom"
import { client } from './apollo';
import App from './App';
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <DndProvider backend={HTML5Backend}>
        <Router>
          <App />
        </Router>
      </DndProvider>
    </ApolloProvider>
  </React.StrictMode >,
  document.getElementById('root')
);
