import React, { createContext, useReducer } from "react";
import jwtDecode from "jwt-decode";

const AuthContext = createContext();

const initialState = {
  userData: null,
};

if (localStorage.getItem("jwtToken")) {
  const decodedToken = jwtDecode(localStorage.getItem("jwtToken"));
  if (decodedToken.exp * 1000 > new Date()) {
    initialState.userData = decodedToken;
  } else {
    localStorage.removeItem("jwtToken");
  }
}

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        userData: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        userData: null,
      };
    default:
      return state;
  }
};

const AuthProvider = (props) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (userData) => {
    localStorage.setItem("jwtToken", userData.token);
    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  };
  const logout = () => {
    localStorage.removeItem("jwtToken");
    dispatch({
      type: "LOGOUT",
    });
  };

  return (
    <AuthContext.Provider
      value={{ userData: state.userData, login, logout }}
      {...props}>
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
