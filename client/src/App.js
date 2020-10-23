import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "semantic-ui-react";

import "./App.css";
import "semantic-ui-css/semantic.min.css";

import MenuBar from "./components/MenuBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <div className='App'>
      <Container>
        <Router>
          <MenuBar />
          <Switch>
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <Route exac path='/' component={Home} />
          </Switch>
        </Router>
      </Container>
    </div>
  );
}

export default App;
