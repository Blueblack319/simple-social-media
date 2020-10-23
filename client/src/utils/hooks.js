import { useState } from "react";

export const useForm = (callback, initialState) => {
  const [values, setValues] = useState(initialState);

  const handleInputChanged = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleFormSubmitted = (event) => {
    event.preventDefault();
    callback();
  };

  return {
    values,
    handleInputChanged,
    handleFormSubmitted,
  };
};
