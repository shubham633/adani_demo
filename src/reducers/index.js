import { combineReducers } from "redux";
import { UserData } from "../RegisterData.json";

let InitialState = UserData;
const formReducer = (state = InitialState, action) => {
  console.log(state);
  switch (action.type) {
    case "Sign_up":
      return [...state, action.payload];
    case "Delete_user": {
      state.splice(action.payload, 1);
      return state.slice();
    }
    case "Name_sort":
      return action.payload;
    case "Email_sort":
      return action.payload;
    // case "Update_user": {
    //   let objIndex = state.findIndex((obj => obj.action.payload === 1));
    //   return state[action.payload]
    // }
    default:
      return state;
  }
};
// localStorage.setItem('userInfo','formReducer')
// console.log(localStorage.getItem('userInfo'))

const userReducer = (state = null, action) => {
  switch (action.type) {
    case "Current_user":
      return action.payload;
    default:
      return state;
  }
};

// const sortReducer = (state = InitialState, action) => {
//   switch (action.type) {
//     case "Sort":
//       return action.payload;
//     default:
//       return state;
//   }
// };

export default combineReducers({
  formReducer,
  userReducer,
  //sortReducer,
});
