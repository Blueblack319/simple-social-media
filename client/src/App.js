import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "semantic-ui-react";

import "./App.css";
import "semantic-ui-css/semantic.min.css";

import { AuthProvider } from "./context/auth";
import AuthRoute from "./context/AuthRoute";
import MenuBar from "./components/MenuBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <div className='App'>
      <Container>
        <AuthProvider>
          <Router>
            <MenuBar />
            <Switch>
              <AuthRoute path='/login' component={Login} />
              <AuthRoute path='/register' component={Register} />
              <Route exac path='/' component={Home} />
            </Switch>
          </Router>
        </AuthProvider>
      </Container>
    </div>
  );
}

export default App;
