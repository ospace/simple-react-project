// import { render } from 'react-dom';
import React from 'react';
import { useRoutes, Navigate } from 'react-router-dom';
import DefaultLayout from 'views/layouts/Default';
import EmptyLayout from 'views/layouts/Empty';
import { useAuth } from 'store/auth';

import Home from 'views/Home';
import test from './test';
import Login from 'views/Login';
import E404 from 'views/errors/404';

// 참고: https://dev.to/iamandrewluca/private-route-in-react-router-v6-lg5
function PrivateDefault() {
  const { isAuth } = useAuth();
  return isAuth ? <DefaultLayout /> : <Navigate to="/login" />;
}

const routeData = [
  {
    path: '/',
    element: <PrivateDefault />,
    children: [...test, { index: true, element: <Home /> }],
  },
  {
    element: <EmptyLayout />,
    children: [{ path: '/login', element: <Login /> }],
  },
  {
    path: '*',
    element: <E404 />,
  },
];

//참고: https://github.com/remix-run/react-router/blob/main/docs/getting-started/tutorial.md
export default function RouteData() {
  return useRoutes(routeData);
}
