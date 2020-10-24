import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import { AuthContext } from "./auth";

const AuthRoute = ({ component: Component, ...rest }) => {
  const { userData } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        userData ? <Redirect to='/' /> : <Component {...props} />
      }
    />
  );
};

export default AuthRoute;
