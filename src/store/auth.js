import { bindEvent, newReducer, newMiddleware } from 'utils/cmm';
import { useSelector } from 'react-redux';
//import axios from 'axios';

// Initial State
const initialState = {
  auth: null,
  isAuth: false,
};

// Actions
const LOGIN = 'auth/LOGIN';
const LOGOUT = 'auth/LOGOUT';

// Action Creators
export const eventLogin = bindEvent(LOGIN);
export const eventLogout = bindEvent(LOGOUT);

//https://daveceddia.com/access-redux-store-outside-react/#option-3-use-middleware-and-intercept-an-action

// const AXIOS_COMMON = axios.defaults.headers.common;
// export function getToken() {
//   return AXIOS_COMMON['Authorization'];
// }

// export function setToken(token) {
//   AXIOS_COMMON['Authorization'] = `Bearer ${token}`;
// }

const authReducer = newReducer(
  {
    [LOGIN]: (state, payload) => ({ auth: payload, isAuth: !!payload }),
    [LOGOUT]: (state, payload) => ({ auth: null, isAuth: false }),
  },
  initialState
);

let g_auth;
export const saveAuth = newMiddleware(
  authReducer,
  (payload) => (g_auth = payload)
);

export function getAuth() {
  return g_auth;
}

export function useAuth() {
  return useSelector((state) => {
    return state.auth;
  });
}

export default authReducer;
