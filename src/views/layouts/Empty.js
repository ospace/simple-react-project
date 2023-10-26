import React from 'react';
import { Outlet } from 'react-router-dom';

export default function Empty({ children }) {
  return (
    <div>
      <Outlet />
    </div>
  );
}
