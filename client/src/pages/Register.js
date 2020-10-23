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
  const [errors, setErrors] = useState({});

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
  const [addUser, { loading }] = useMutation(ADD_USER, {
    // eslint-disable-next-line
    update(proxy, result) {
      console.log(result);
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

  const handleInputChanged = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleFormSubmitted = (event) => {
    event.preventDefault();
    addUser();
  };

  return (
    <div className='register'>
      <Form onSubmit={handleFormSubmitted} loading={loading}>
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
