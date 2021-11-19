export const signup = (name, email, password) => {
  return {
    type: "Sign_up",
    payload: {
      name,
      email,
      password,
      profession: "",
    },
  };
};

export const currentuser = (userData) => {
  return {
    type: "Current_user",
    payload: userData,
  };
};

export const sortByName = (userData) => {
  return {
    type: "Name_sort",
    payload: userData,
  };
};
export const sortByEmail= (userData) => {
  return {
    type: "Email_sort",
    payload: userData,
  };
};

export const deleteUser = (userData) => {
  console.log(userData)
  return {
    type: "Delete_user",
    payload: userData,
  };
};

export const updateUser=(userData)=>{
  return{
    type:"Update_user",
    payload:userData
  }
}
