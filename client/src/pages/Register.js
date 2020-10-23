import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { gql, useMutation } from "@apollo/client";

import "./Register.css";

const Register = () => {
  const [values, setValues] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

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
  // eslint-disable-next-line
  const [addUser, { loading }] = useMutation(ADD_USER, {
    update(proxy, result) {
      console.log(result);
    },
    variables: values,
  });

  const handleInputChanged = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleFormSubmitted = (event) => {
    event.preventDefault();
    addUser();
  };

  return (
    <div className='register'>
      <Form onSubmit={handleFormSubmitted}>
        <Form.Input
          label='User Name'
          placeholder='User Name'
          type='text'
          name='userName'
          value={values.userName}
          onChange={handleInputChanged}
        />
        <Form.Input
          label='Email'
          placeholder='Email'
          type='email'
          name='email'
          value={values.email}
          onChange={handleInputChanged}
        />
        <Form.Input
          label='Password'
          placeholder='Password'
          type='password'
          name='password'
          value={values.password}
          onChange={handleInputChanged}
        />
        <Form.Input
          label='Confirm Password'
          placeholder='Confirm Password'
          type='password'
          name='confirmPassword'
          value={values.confirmPassword}
          onChange={handleInputChanged}
        />
        <Button type='submit' color='teal'>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Register;
