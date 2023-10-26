import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useAuth } from 'utils/hook';
import { emitLogout } from 'store/auth';

import './GNB.css';

function Logout() {
  const { auth } = useAuth();
  const dispatch = useDispatch();

  return (
    <>
      {auth.name}&nbsp;
      <button onClick={() => emitLogout(dispatch)}>Logout</button>
    </>
  );
}

const GNB = () => {
  return (
    <div className="menu">
      <ul>
        <li>
          <Link to="/comp">Component</Link>
        </li>
        <li>
          <Link to="/form">Form</Link>
        </li>
        <li>
          <Link to="/api">Api</Link>
        </li>
        <li>
          <Logout />
        </li>
      </ul>
    </div>
  );
};

export default GNB;
