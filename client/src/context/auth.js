import React, { createContext, useReducer } from "react";

const AuthContext = createContext();

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
  const [state, dispatch] = useReducer(authReducer, { userData: null });

  const login = (userData) => {
    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  };
  const logout = () => {
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
