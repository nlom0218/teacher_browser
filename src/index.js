import { ApolloProvider } from "@apollo/client";
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { client } from "./apollo";
import App from "./App";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { RecoilRoot } from "recoil";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RecoilRoot>
        <DndProvider backend={HTML5Backend}>
          <Router>
            <App />
          </Router>
        </DndProvider>
      </RecoilRoot>
    </ApolloProvider>
  </React.StrictMode>
);
