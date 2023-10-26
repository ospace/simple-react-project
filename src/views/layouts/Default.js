import React from 'react';
import Header from './Header';
import GNB from './GNB';
import { Outlet } from 'react-router-dom';

// https://stackoverflow.com/questions/69999324/how-do-i-render-components-with-different-layouts-elements-using-react-router-do
// react

export default function Default() {
  return (
    <>
      <Header />
      <GNB />
      <div style={{ padding: 10 }}>
        <Outlet />
      </div>
    </>
  );
}
