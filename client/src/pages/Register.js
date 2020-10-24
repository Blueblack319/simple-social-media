import React, { useContext, useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { gql, useMutation } from "@apollo/client";

import "./Register.css";
import { AuthContext } from "../context/auth";
import { useForm } from "../utils/hooks";

const ADD_USER = gql`
  mutation register(
    $userName: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        userName: $userName
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      userName
      createdAt
      token
    }
  }
`;

const Register = (props) => {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const { values, handleInputChanged, handleFormSubmitted } = useForm(
    registerUser, // Using function keyword!
    {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    }
  );

  const [addUser, { loading }] = useMutation(ADD_USER, {
    update(proxy, { data: { register: userData } }) {
      context.login(userData);
      props.history.push("/");
    },
    onError(err) {
      setErrors(
        err.graphQLErrors[0].extensions.errors
          ? err.graphQLErrors[0].extensions.errors
          : err.graphQLErrors[0].extensions.error
      );
    },
    variables: values,
  });

  // variable function VS function...? => function used function keyword is defined as soon as its surrounding function or script is executed (due to hoisting).
  function registerUser() {
    addUser(); // 정의되기 전에 사용... => 가설: function() 즉, 함수의 실행은 함수정의 전에 해도 되지만 나중에 함수가 무조건 정의되어 있어야 한다?
  }

  return (
    <div className='register'>
      <Form onSubmit={handleFormSubmitted} loading={loading}>
        <h1>Register</h1>
        <Form.Input
          label='User Name'
          placeholder='User Name'
          type='text'
          name='userName'
          value={values.userName}
          onChange={handleInputChanged}
          error={errors.userName ? true : false}
        />
        <Form.Input
          label='Email'
          placeholder='Email'
          type='email'
          name='email'
          value={values.email}
          onChange={handleInputChanged}
          error={errors.email ? true : false}
        />
        <Form.Input
          label='Password'
          placeholder='Password'
          type='password'
          name='password'
          value={values.password}
          onChange={handleInputChanged}
          error={errors.password ? true : false}
        />
        <Form.Input
          label='Confirm Password'
          placeholder='Confirm Password'
          type='password'
          name='confirmPassword'
          value={values.confirmPassword}
          onChange={handleInputChanged}
          error={errors.confirmPassword ? true : false}
        />
        <Button type='submit' color='teal'>
          Submit
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className='ui error message'>
          <div className='list'>
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
