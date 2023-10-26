import React, {
  useState,
  // useRef,
  useEffect,
  // useMemo,
  // useCallback,
  // useReducer,
  createContext,
  useContext,
} from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import queryString from 'query-string';
import test from 'api/todo';

const DataContext = createContext(null);

export function useDataContext() {
  const state = useContext(DataContext);
  if (!state) throw new Error('no state');

  return state;
}

export default function Api({ history }) {
  const params = useParams();
  const location = useLocation();
  const qs = queryString.parse(location.search);

  const navigate = useNavigate();
  // const history = useHistory();

  const [data, setData] = useState(null);
  const [msg, setMsg] = useState('Loading...');

  useEffect(() => {
    getApi();
  }, []);

  const getApi = async () => {
    try {
      setData(null);
      const res = await test.get();
      setData(res.data);
    } catch (ex) {
      setMsg('Error! ');
      alert(`todo ERROR: ${ex.message}`);
    }
  };

  // 매번 reducer 작성이 번거롭기 때문에 사용자 HOOK 정의
  /*
  useAsync.js
  function useAsync(callback, deps = []) {
    const [ state, dispatch ] = useReducer(reducer, {
      loading: false,
      data: null,
      error: null,
    });

    useEffect(()=> {
      (async () => {
        dispatch({ type: 'LOADING' });
        try {
          const data = await callback();
          dispatch({ type: 'SUCCESS', data });
        } catch(ex) {
          dispatch({ type: 'ERROR', error: ex });
        }
      })();
    }, deps);
  }
  */

  // react-async 모듈를 사용하면 조금 편해짐.
  /*
    import { useAsync } from 'react-async';
    const loadUser = async({ id }, { signal }) => {
      const res = await user.get( signal );
      return res.data;
    });

    사용예: 로딩시 호출해서 가져옴
    const { data, error, isLoading } = useAsync({ promiseFn: loadUser, id: 1 });
    if (isLoading) ...
    if (error) ...

    watch로 변경사항 감시.
    const { data, error, isLoading } = useAsync({ promiseFn: loadUser, id: 1, watch: id });

    기본 호출하고 다시 reload 호출해서도 로딩함.
    const { data, error, isLoading, reload } = useAsync({ promiseFn: loadUser, id: 1 });

    run 직접 호출해야 로딩함.
    const { data, error, isLoading, run } = useAsync({ promiseFn: loadUser, id: 1 });
  */

  if (!data) return <div>{msg}</div>;
  if (!data) navigate('/'); // '/'으로 페이지 이동

  return (
    <>
      <h1>Test02</h1>
      <h2>param: {params.name || '-'}</h2>
      <h2>query: {qs.name || '-'}</h2>
      <ul>
        <li>
          <Link to="/api/foo">with param - /api/foo</Link>{' '}
        </li>
        <li>
          <Link to="/api?name=bar">with query - /api?name=bar</Link>
        </li>
      </ul>

      <button onClick={getApi}>Reload</button>
      <ul>
        {data.map((it) => (
          <li key={it.id}>{it.title}</li>
        ))}
      </ul>
    </>
  );
}
