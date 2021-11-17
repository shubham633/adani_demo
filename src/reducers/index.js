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

export default combineReducers({
  formReducer,
});
