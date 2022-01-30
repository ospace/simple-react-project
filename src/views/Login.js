import React, { useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'store/auth';
import auth from 'api/auth';

export default function Login() {
  const [user, setUser] = useState({ loginId: 'foo', password: 'secret' });
  const info = useMemo(
    () => `${user.loginId || '-'}, ${user.password || '-'}`,
    [user]
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function onLogin() {
    try {
      await dispatch(auth.loginThunk(user));
      console.log('> auth:', getAuth());
      navigate('/');
    } catch (ex) {
      setUser({ loginId: '', password: '' });
    }
  }

  return (
    <>
      <h1>Login</h1>
      <h3>
        ({process.env.REACT_APP_ENV}/{process.env.NODE_ENV})
      </h3>
      <input
        type="text"
        placeholder="email"
        value={user.loginId}
        onChange={({ target: { value } }) => {
          setUser({ ...user, loginId: value });
        }}
      />
      <input
        type="password"
        placeholder="password"
        value={user.password}
        onChange={({ target: { value } }) =>
          setUser({ ...user, password: value })
        }
      />
      <button onClick={onLogin}>Login</button>
      <div>{info}</div>
      <div>{process.env.REACT_APP_FOO}</div>
      <div>{process.env.REACT_APP_AUTH}</div>
    </>
  );
}
