import authService from "../../services/auth.service";
import { AUTHENTICATED, NOT_AUTHENTICATED } from "../actionTypes";

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
      dispatch({
        type: AUTHENTICATED,
        payload: data,
      });
    }else{
        dispatch({
            type : NOT_AUTHENTICATED
        })
    }
  };
};

export { getToken , loginUser};
