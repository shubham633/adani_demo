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

export const currentuser = (userData) => {
  return {
    type: "Current_user",
    payload: userData,
  };
};

export const sorting = (userData) => {
  return {
    type: "Sort",
    payload: userData
  };
};
