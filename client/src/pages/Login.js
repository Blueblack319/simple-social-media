import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { gql, useMutation } from "@apollo/client";

import "./Login.css";
import { useForm } from "../utils/hooks";

const LOGIN_USER = gql`
  mutation LoginUser($userName: String!, $password: String!) {
    loginUser(userName: $userName, password: $password) {
      id
      email
      userName
      createdAt
      token
    }
  }
`;

const Login = (props) => {
  const [errors, setErrors] = useState("");
  const { values, handleInputChanged, handleFormSubmitted } = useForm(
    loginUserCallback,
    {
      userName: "",
      password: "",
    }
  );

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(proxy, result) {
      console.log(result);
      props.history.push("/");
    },
    onError(err) {
      console.log(err);
      setErrors(
        err.graphQLErrors[0].extensions.errors
          ? err.graphQLErrors[0].extensions.errors
          : err.graphQLErrors[0].extensions.error
      );
    },
    variables: values,
  });

  function loginUserCallback() {
    loginUser();
  }

  return (
    <div className='login'>
      <Form onSubmit={handleFormSubmitted} loading={loading}>
        <h1>Login</h1>
        <Form.Input
          label='User Name'
          name='userName'
          type='text'
          placeholder='User Name'
          value={values.userName}
          onChange={handleInputChanged}
          error={errors.userName ? true : false}
        />
        <Form.Input
          label='Password'
          name='password'
          type='password'
          placeholder='Password'
          value={values.password}
          onChange={handleInputChanged}
          error={errors.password ? true : false}
        />
        <Button type='submit' color='teal'>
          Login
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className='ui error message'>
          <div className='list'>
            {Object.values(errors).map((err) => (
              <li key={err}>{err}</li>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
