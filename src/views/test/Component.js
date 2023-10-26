import React, {
  useState,
  useEffect,
  useReducer,
  useMemo,
  useRef,
  useCallback,
  createContext,
  useContext,
} from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { increase, decrease } from 'store/counter';
import './Component.css';

// 간단한 컴포넌트
function Hello({ name, color, isReact }) {
  useEffect(() => {
    console.log('> Hello mounted');
    return () => {
      console.log('> Hello unmounted');
    };
  }, []);

  return (
    <div style={{ color }}>
      안녕하세요 {name}!{isReact ? '만나서 반가워요.' : null}
    </div>
  );
}

Hello.defaultProps = {
  name: 'Guest',
};

function Counter() {
  const [value, setValue] = useState(0);

  // 값 변경 감지하여, 0이하로 감소 중지
  useEffect(() => {
    setValue(0 > value ? 0 : value);
  }, [value]);

  const onIncrease = () => {
    setValue(value + 1);
  };
  const onDescrease = () => {
    setValue(value - 1);
  };

  return (
    <>
      {value}
      <button onClick={onIncrease}>+</button>
      <button onClick={onDescrease}>-</button>
    </>
  );
}

function CounterReducer() {
  const [state, dispatch] = useReducer(reducer, 0);

  const onIncrease = () => {
    dispatch({ type: 'INC' });
  };

  const onDecrease = () => {
    dispatch({ type: 'DEC' });
  };

  return (
    <>
      {state}
      <button onClick={onIncrease}>+</button>
      <button onClick={onDecrease}>-</button>
    </>
  );
}

function reducer(state, action) {
  switch (action.type) {
    case 'INC':
      return state + 1;
    case 'DEC':
      return state - 1;
    default:
      return state;
  }
}

function Dictionary({ value }) {
  const [data, setData] = useState(value);
  const [item, setItem] = useState({ key: '', value: '' });
  const nickInput = useRef();
  const nextId = useRef(0);

  const count = useMemo(() => data.filter((it) => it.selected).length, [data]); //2nd 인자는 deps 배열로 변경시 값 갱신

  const onChange = ({ target: { name, value } }) => {
    undefined !== value &&
      setItem({
        ...item,
        [name]: value,
      });
  };

  const onClickAdd = () => {
    // 신규인경우
    if (undefined === item.id) {
      const value = {
        ...item,
        id: nextId.current,
      };
      // 배열에 값을 추가함
      //setValues([...values, value]);
      setData(data.concat(value));

      setItem({ key: '', value: '' });
      nextId.current += 1;
    } else {
      // 기존저장
      const found = data.find((it) => it.id === item.id);
      found && Object.assign(found, item);
      setItem({ key: '', value: '' });
    }
  };

  // useCallback으로 리랜덩시 함수 생성하지 않고 재사용
  const onAction = useCallback(
    (type, value) => {
      switch (type) {
        case 'DEL':
          setData(data.filter((it) => it.id !== value.id));
          item.id === value.id && setItem({ key: '', value: '' });
          break;
        case 'EDIT':
          setItem(value);
          break;
        default:
          throw new Error(`unsupported ${type}`);
      }
    },
    [data, item]
  );

  // nickInput.current.focus();
  return (
    <>
      <div>
        <div>
          선택수: {count} / {data.length}
        </div>
        <input name="key" onChange={onChange} value={item.key} />
        <input
          name="value"
          onChange={onChange}
          value={item.value}
          ref={nickInput}
        />
        <button onClick={onClickAdd}>
          {undefined === item.id ? 'Add' : 'Save'}
        </button>
      </div>
      <table className="data">
        <thead>
          <tr>
            <td>Key</td>
            <td>Value</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <Item item={item} onAction={onAction} key={item.id} />
          ))}
          {0 === data.length && (
            <tr>
              <td colspan="3">No date</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}

Dictionary.defaultProps = {
  value: [],
};

function Item({ item, onAction }) {
  useEffect(() => {
    console.log('> Item mounted:', item);
    return () => {
      console.log('> Item unmounted');
    };
  }, [item]); // item 넘겨줌. 안해도 잘되는 이유가?????

  return (
    <tr>
      <td>
        <b style={{ color: item.selected ? 'green' : '' }}>{item.key}</b>{' '}
      </td>
      <td>
        <span>{item.value}</span>
      </td>
      <td>
        <button onClick={onAction.bind(null, 'DEL', item)}>del</button>
        <button onClick={onAction.bind(null, 'EDIT', item)}>edit</button>
      </td>
    </tr>
  );
}

const DataContext = createContext(null);

export function useDataContext() {
  const state = useContext(DataContext);
  if (!state) throw new Error('no state');

  return state;
}

function MyContext() {
  const [state] = useState(null);
  // store에서 원하는 counter state을 선택함.
  const { number } = useSelector(
    (state) => ({
      number: state.counter.counter,
    }),
    shallowEqual // 객체로 리턴하는 경우 하나라고 변경되면 리렌더되서 불필요한 부하를 제거용
  );
  const dispatch = useDispatch();

  return (
    <DataContext.Provider value={state}>
      <div>
        {number}
        <button onClick={() => dispatch(increase())}>+</button>
        <button onClick={() => dispatch(decrease())}>-</button>
      </div>
    </DataContext.Provider>
  );
}

export default function Component() {
  return (
    <>
      <h1>Component</h1>
      <hr alt="ex01" />
      <h2>Hello</h2>
      <Hello name="foo" color="green" />
      <Hello color="green" isReact={true} />

      <hr alt="ex02" />

      <h2>Counter</h2>
      <Counter />

      <hr alt="ex03" />
      <h2>Counter Reducer</h2>
      <CounterReducer />

      <hr />
      <h2>Dictionary</h2>
      <Dictionary />

      <hr />
      <h2>Context</h2>
      <MyContext />
    </>
  );
}
