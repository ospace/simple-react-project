// let urlPath = '/login';
import { eventLogin, eventLogout } from 'store/auth';
import { bindThunk } from 'utils/cmm';

const exports = {
  login({ loginId, password }) {
    return new Promise((resolve) => {
      setTimeout(() => {
        let res = { loginId };
        resolve(res);
      }, 1000);
    });
  },
  loginThunk(req) {
    return bindThunk(() => this.login(req), eventLogin);
  },
  logout() {
    return new Promise((resolve) => {
      setTimeout(() => resolve(), 2000);
    });
  },
  logutThunk() {
    return bindThunk(this.logout, eventLogout);
  },
};

export default exports;
