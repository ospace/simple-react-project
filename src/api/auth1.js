import axios from 'axios';
// import axiosApi from 'api';
// import { getEncryptOnce } from '@/utils/rsa';

let axiosApiRaw = axios.create({ baseURL: process.env.VUE_APP_BASE_URL });

axiosApiRaw.defaults.headers.common['Authorization'] = process.env.VUE_APP_AUTH;

// let urlPath = '/login';

let users = {
  f: {
    name: 'foo',
    password: '1',
  },
  b: {
    name: 'bar',
    password: '2',
  },
};

export function login({ loginId, password }) {
  return new Promise((resolve, reject) => {
    const user = users[loginId];
    if (!user) {
      reject('unknown user!');
    } else if (password === user.password) {
      resolve(user);
    } else {
      reject('password wrong!');
    }
  });
  // if (!req) {
  //   return;
  // }
  // req.userPwd = await ge tEncryptOnce(req.userPwd); // RSA 암호화
  // req.loginChCd = '02';
  // let res = await axiosApiRaw.post(`${urlPath}/userLogin`, req);
  // let resData = res.data;
  // if ('S' !== resData.returnCode) {
  //   return resData;
  // }
  // setAuth(Object.assign({ loginId: req.userId }, resData.data));
  // return resData;
}

// export async function smsAuthenticationRequest(req) {
// 	if (!req) {
// 		return null;
// 	}

// 	let res = await getEncryptOnce(req.userPwd); // RSA 암호화
// 	req.userPwd = res.password;
// 	req.rsaId = res.rsaId;
// 	req.loginChCd = '02';

// 	let res2 = await axiosApiRaw.post(`${urlPath}/smsAuthenticationRequest`, req);

// 	let resData = res2.data;
// 	if ('S' !== resData.returnCode) {
// 		return resData;
// 	}

// 	setAuth(Object.assign({ loginId: req.userId }, resData.data));

// 	return resData;
// }

// export async function smsAuthentication(req) {
// 	if (!req) return;
// 	if (req.password) {
// 		let res = await getEncryptOnce(req.userPwd);
// 		req.userPwd = res.password; // RSA 암호화
// 	}
// 	req.connChCd = '02';

// 	let res = await axiosApiRaw.post(`${urlPath}/smsAuthentication`, req);

// 	let resData = res.data;
// 	if ('S' !== resData.returnCode) return resData;

// 	setAuth(Object.assign({ loginId: req.userId }, resData.data));

// 	return resData;
// }

export async function logout() {
  // let params = { loginChCd: '02' };
  // await axiosApi.get(`${urlPath}/userLogout`, { params });
  // setAuth(null);
}
