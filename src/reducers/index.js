import { combineReducers } from "redux";
import { UserData } from "../RegisterData.json";

// state.push({
//   name: action.payload.name,
//   email: action.payload.email,
//   password: action.payload.password,
// });

let InitialState = UserData;
const formReducer = (state = InitialState, action) => {
  console.log(action);
  switch (action.type) {
    case "Sign_up":
      return [...state, action.payload];
    default:
      return state;
  }
};

const userReducer = (state = {}, action) => {
  console.log(action);
  switch (action.type) {
    case "Current_user":
      return action.payload;
    default:
      return state;
  }
};

const sortReducer = (state = InitialState, action) => {
  switch (action.type) {
    case "Sort":
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  formReducer,
  userReducer,
  sortReducer
});
