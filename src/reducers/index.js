import { combineReducers } from "redux";
import { UserData } from "../RegisterData.json";

let InitialState = UserData;
const formReducer = (state = InitialState, action) => {
  switch (action.type) {
    case "SIGN_UP":
      return [...state, action.payload];
    case "DELETE_USER": {
      let objIndex = state.findIndex((obj) => obj.email === action.payload);
      state.splice(objIndex, 1);
      return state.slice();
    }
    case "UPDATE_USER": {
      let objIndex = state.findIndex(
        (obj) => obj.email === action.payload.userIdentity
      );
      state[objIndex].role = action.payload.updationData.role;
      state[objIndex].salary = action.payload.updationData.salary;
      return [...state];
    }
    case "IS_EDITING": {
      let objIndex = state.findIndex(
        (obj) => obj.email === action.payload.userIdentity
      );
      state[objIndex].isEdit = !state[objIndex].isEdit;
      return [...state];
    }
    default:
      return state;
  }
};

const searchReducer = (state = [], action) => {
  switch (action.type) {
    case "SEARCH_USER": {
      return action.payload;
    }
    case "DELETE_USER": {
      let objIndex = state.findIndex((obj) => obj.email === action.payload);
      state.splice(objIndex, 1);
      return state.slice();
    }
    default:
      return state;
  }
};

const userReducer = (state = null, action) => {
  switch (action.type) {
    case "CURRENT_USER":
      return action.payload;
    default:
      return state;
  }
};

const searchingTxtReducer = (state = "", action) => {
  switch (action.type) {
    case "SEARCH_TXT":
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  formReducer,
  userReducer,
  searchingTxtReducer,
  searchReducer,
});
