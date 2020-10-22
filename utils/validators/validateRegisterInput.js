const validateRegisterInput = (userName, email, password, confirmPassword) => {
  const errors = {};
  if (userName.trim() === "") {
    errors.userName = "UserName must not be empty";
  }
  if (password === "") {
    errors.password = "Password must not be empty";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords must be matched";
  }
  if (email.trim() === "") {
    errors.email = "Email must not be empty";
  } else {
    const regEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!email.match(regEx)) {
      errors.email = "Email must be a valid email address";
    }
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

export default validateRegisterInput;
