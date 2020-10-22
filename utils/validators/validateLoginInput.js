const validateLoginInput = (userName, password) => {
  const errors = {};
  if (userName.trim() === "") {
    errors.userName = "UserName must not be empty";
  }
  if (password === "") {
    errors.password = "Password must not be empty";
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

export default validateLoginInput;
