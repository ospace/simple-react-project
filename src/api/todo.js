// import React, { useState, useEffect } from 'react';
import api from '../api';

//let urlPath = 'https://gorest.co.in/public/v1/todos';
let urlPath = '/public/v1/todos';
//let urlPath = 'https://jsonplaceholder.typicode.com/users';

// 요청 상태 관리
// 1. 요청 결과
// 2. 로딩 상태
// 3. 에러

const exports = {
  get(params) {
    params = params || {};
    params.t = new Date().getTime();
    return api.get(`${urlPath}`, { params });
  },
  post(req) {
    return api.post(`${urlPath}`, req);
  },
  put(req) {
    return api.get(`${urlPath}`, req);
  },
  delete(params) {
    params = params || {};
    params.t = new Date().getTime();
    return api.delete(`${urlPath}`, { params });
  },
};

export default exports;
