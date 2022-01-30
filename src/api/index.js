import axios from 'axios';
//import { getAuth, setAuth } from 'utils/cmm';
//import router from 'routes';

const instance = axios.create({ baseURL: process.env.REACT_APP_BASE_URL });

//instance.defaults.timeout = 2500;

instance.interceptors.request.use(
  (config) => {
    // 요청 성공 직전 호출됩니다.
    //let auth = getAuth();
    //config.headers['x-login-token'] = auth && auth.authToken;
    //config.headers['Authorization'] = process.env.REACT_APP_AUTH;

    return config;
  },
  (error) => {
    // 요청 에러 직전 호출됩니다.
    return Promise.reject(error);
  }
);

// 응답 인터셉터
instance.interceptors.response.use(
  async (response) => {
    /**
     * http status가 200인 경우
     * 응답 성공 직전 호출됩니다.
     * .then() 으로 이어집니다.
     */
    let resData = response.data;
    if (!resData) {
      return Promise.reject({ message: `body is empty!` });
    }
    // if (!('returnCode' in resData)) {
    //   return Promise.reject({ message: `returnCode not exist in body` });
    // }
    // if ('S' !== resData.returnCode) {
    //   let status = resData.errorCode;
    //   let message = `${resData.errorMessage} (에러코드: ${status})`;

    //   if ('API_4002' === status) {
    //     message = '연결이 끊겼습니다. 다시 로그인해주세요.';
    //     //setAuth(null);
    //     router.replace({ name: 'login' }).catch(() => {});
    //   } else if ('4010' === status) {
    //     message = '세션이 만료되었습니다. 다시 로그인해주세요.';
    //     //setAuth(null);
    //     router.replace({ name: 'login' }).catch(() => {});
    //   }

    //   return Promise.reject({
    //     status,
    //     message,
    //     url: response.config && response.config.url,
    //   });
    // }
    //return resData.data;
    return resData;
  },
  (error) => {
    /**
     * http status가 200이 아닌 경우
     * 응답 에러 직전 호출됩니다.
     * .catch() 으로 이어집니다.
     */
    return Promise.reject(error);
  }
);

export default instance;
