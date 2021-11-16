import { combineReducers } from "redux";

const InitialState = { name: "", email: "", password: "" };
const formReducer = (state = InitialState, action) => {
  console.log(action);
  switch (action.type) {
    case "Sign_up":
      return action.payload;
    case "Sign_in":
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  formReducer,
});
