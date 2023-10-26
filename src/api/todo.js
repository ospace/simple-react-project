// import React, { useState, useEffect } from 'react';
import api from '../api';
import { newApi } from 'utils/cmm';

let urlPath = '/public/v1/todos';

const exports = newApi(api, urlPath);

export default exports;
