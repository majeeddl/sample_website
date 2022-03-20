import { AUTHENTICATED, ERROR_AUTHENTICATE, NOT_AUTHENTICATED } from "../actionTypes";

const initialState = {
  authChecked: false,
  loggedIn: false,
  token : null,
  currentUser: {
  },
  error : ""
};

const authorizationReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATED:
      return {
        authChecked: true,
        loggedIn: true,
        currentUser: action.payload.user,
        token: action.payload.token,
        error : null
      };
    case NOT_AUTHENTICATED:
      return {
        authChecked: true,
        loggedIn: false,
        currentUser: {},
        token: null,
        error : null
      };
    case ERROR_AUTHENTICATE:
      return {
        authChecked: true,
        loggedIn: false,
        currentUser: {},
        token : null,
        error : action.payload
      }
    default:
      return state;
  }
};

export { authorizationReducer };
