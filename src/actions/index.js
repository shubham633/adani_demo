export const signup = (name, email, password) => {
  return {
    type: "Sign_up",
    payload: {
      name,
      email,
      password,
    },
  };
};

export const signin = () => {
  return {
    type: "Sign_in",
  };
};
