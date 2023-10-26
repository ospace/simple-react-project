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
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import test from 'api/todo1';

const DataContext = createContext(null);

export function useDataContext() {
  const state = useContext(DataContext);
  if (!state) throw new Error('no state');

  return state;
}

export default function Test02({ history }) {
  const params = useParams();
  const location = useLocation();
  const qs = queryString.parse(location.search);

  const navigate = useNavigate();

  // const history = useHistory();
  // routes/index.js에서 '/test02/:name'에 의해서 name 속성으로 값이 저장
  console.log('> Test02 - params:', params, location.search, qs.name);
  console.log('> Test02 - history:', history);

  const [data, setData] = useState(null);
  const [msg, setMsg] = useState('Loading...');

  useEffect(() => {
    getTest();
  }, []);

  const getTest = async () => {
    try {
      setData(null);
      const res = await test.get();
      console.log('res:', res);
      setData(res.data);
    } catch (ex) {
      console.error('test.get:', ex);
      setMsg('No Data!');
      alert(`todo ERROR: ${ex.message}`);
    }
  };

  //useReduce를 사용해서 상태로 요청 관리. reducer의 state으로 로딩, 성공, 에러를 구분 처리가능.
  /*
    function reducer(state, action) {
      switch(action.type) {
        case'LOADING': return { loading: true, data: null };
        case'SUCCESS': return { loading: false, data: action.data };
        case'ERROR': return { loading: false, data: null, error: action: error };
        default: throw new Error(`unsupported type: ${action.type}`);
      }
    }
  */
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
  // 결론: useReducer는 너무 번거롭고, 다양한 경우에 대해 대응 힘듬.
  // useReducer가 활용도가 더 넓고, 이벤트 디스패치처럼 사용할 수 있음.

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

  console.log('> data:', data);
  if (!data) return <div>{msg}</div>;
  if (!data) navigate('/'); // '/'으로 페이지 이동

  return (
    <>
      <h1>Test02</h1>
      <button onClick={getTest}>Reload</button>
      <ul>
        {data.map((it) => (
          <li key={it.id}>{it.title}</li>
        ))}
      </ul>
    </>
  );
}
