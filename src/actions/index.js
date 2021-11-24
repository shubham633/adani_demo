export const signup = (name, email, password) => {
  return {
    type: "SIGN_UP",
    payload: {
      name,
      email,
      password,
      role: "default",
      salary: 32400,
      isUpdate: false,
    },
  };
};

export const currentuser = (userData) => {
  return {
    type: "CURRENT_USER",
    payload: userData,
  };
};

export const deleteUser = (userData) => {
  return {
    type: "DELETE_USER",
    payload: userData,
  };
};

export const isUpdating = (userIdentity) => {
  return {
    type: "IS_EDITING",
    payload: { userIdentity },
  };
};

export const updateUser = (userIdentity, role, salary) => {
  return {
    type: "UPDATE_USER",
    payload: { userIdentity, updationData: { role, salary } },
  };
};

export const searchingTxt = (txt) => {
  return {
    type: "SEARCH_TXT",
    payload: txt,
  };
};

export const searchUser = (user) => {
  return {
    type: "SEARCH_USER",
    payload: user,
  };
};
