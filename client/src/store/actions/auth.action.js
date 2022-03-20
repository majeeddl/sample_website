import accountService from "../../services/account.service";
import authService from "../../services/auth.service";
import { AUTHENTICATED, ERROR_AUTHENTICATE, NOT_AUTHENTICATED } from "../actionTypes";

const setToken = (token) => {
  localStorage.setItem("token", token);
  localStorage.setItem("lastLoginTime", new Date(Date.now()).getTime());
};

const getToken = () => {
  const now = new Date(Date.now()).getTime();
  const timeAllowed = 1000 * 60 * 30;
  const timeSinceLastLogin = now - localStorage.getItem("lastLoginTime");
  if (timeSinceLastLogin < timeAllowed) {
    return localStorage.getItem("token");
  }
};

const deleteToken = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("lastLoginTime");
};

const loginUser = (credentials) => {
  return async (dispatch) => {
    const data = await authService.login(credentials);
    if (data.token) {
      setToken(data.token);
      dispatch({
        type: AUTHENTICATED,
        payload: data,
      });
    } else {
      dispatch({
        type: ERROR_AUTHENTICATE,
        payload : data.message
      });
    }
  };
};

const checkAuth = () => {
  return async (dispatch) => {
    const user = await accountService.getUser();

    if (user) {
      dispatch({
        type: AUTHENTICATED,
        payload: {
          user,
          token: getToken,
        },
      });
    } else {
      deleteToken();
      dispatch({
        type: NOT_AUTHENTICATED,
      });
    }
  };
};

const logout = () => {
  return async (dispatch) => {

      deleteToken();
      dispatch({
        type: NOT_AUTHENTICATED,
      });
  };
};

const errorLogin =(dispatch,action)=>{
  return dispatch({
    type: ERROR_AUTHENTICATE,
    payload : action.payload
  });
}


export { getToken, loginUser, checkAuth ,logout ,errorLogin };
