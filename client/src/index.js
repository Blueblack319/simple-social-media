import React from "react";
import ReactDOM from "react-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";

import App from "./App";
import * as serviceWorker from "./serviceWorker";

const httpLink = createHttpLink({ uri: "http://localhost:5000" });

const authLink = setContext((request, prevContext) => {
  const token = localStorage.getItem("jwtToken");
  return {
    headers: { authorization: token ? `Bearer ${token}` : "" },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink), // authLink는 객체인데 concat??
  cache: new InMemoryCache(),
});

// console.log(typeof authLink);

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
