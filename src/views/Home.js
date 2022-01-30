import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './Home.css';
import { eventLogout, useAuth } from 'store/auth';

function Logout() {
  const { isAuth } = useAuth();

  const dispatch = useDispatch();

  if (!isAuth) return '';

  return (
    <button disabled={!isAuth} onClick={() => dispatch(eventLogout())}>
      Logout
    </button>
  );
}

const Home = function () {
  const linkName = 'Learn React';
  const style = {
    color: 'red',
  };

  const isAuth = useAuth();

  return (
    <div className="App">
      <h1>
        {isAuth ? '로그인됨' : '비회원'}
        <Logout />
      </h1>
      <div>
        <ul>
          <li>
            <Link to="/test01">Test01</Link>
          </li>
          <li>
            <Link to="/test02">Test02</Link>
          </li>
          <li>
            <Link to="/test02/foo">Test02 with params</Link>{' '}
          </li>
          <li>
            <Link to="/test02?name=bar">Test02 with query</Link>
          </li>
          <li>
            <Link to="/test03">Test03</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </div>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
        style={style}
      >
        {linkName}
      </a>
    </div>
  );
};

export default Home;
