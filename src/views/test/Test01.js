import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
  useReducer,
} from 'react';
import Hello2 from './02_Hello2';

function Item({ item, onClickDel, onClickEdit, onClickDel2 }) {
  useEffect(() => {
    console.log('> Item mounted:', item);
    return () => {
      console.log('> Item unmounted');
    };
  }, [item]); // item 넘겨줌. 안해도 잘되는 이유가?????

  return (
    <div>
      <b style={{ color: item.selected ? 'green' : '' }}>{item.name}: </b>{' '}
      <span>{item.email}</span>
      <button onClick={() => onClickDel(item.id)}>del</button>
      <button onClick={() => onClickDel2(item.id)}>del2</button>
      <button onClick={() => onClickEdit(item)}>edit</button>
    </div>
  );
}

function countSelected(data) {
  return data.filter((it) => it.selected).length;
}

export default function Test01() {
  // ex02. useState을 사용
  // 2개의 배열로 리턴되고 바로 분리
  const [value, setValue] = useState(0);
  const onIncrease = () => {
    setValue(value + 1);
  };
  const onDescrease = () => {
    setValue(value - 1);
  };

  useEffect(() => {
    console.log('> value changed:', value);
    //if (0 > value) setValue(-value);
    setValue(0 > value ? -value : value);
  }, [value]);

  // ex03. 객체를 useState에서 사용
  // 2개의 배열로 리턴되고 바로 분리
  const [data, setData] = useState({
    name: '',
    value: '',
  });

  // const dataStr = useCallback(() => {
  //   console.log('> data changed:', data);
  //   return `${data.name}, ${data.email}`;
  // }, [data]);

  const dataStr = useMemo(() => {
    console.log('> data changed:', data);
    return `${data.name || ''}, ${data.email || ''}`;
  }, [data]);

  useEffect(() => {
    console.log('> dataStr changed');
  }, [dataStr]);

  // useRef사용해서 객체 참조 관리
  const nickInput = useRef();

  const onChange = (ev) => {
    const { name, value } = ev.target;
    undefined !== value &&
      setData({
        ...data,
        [name]: value,
      });
  };

  const onClickValue = () => {
    setData({
      ...data,
      email: data.email,
    });
    nickInput.current.focus();
  };

  const nextId = useRef(10);

  // ex04. 데이터 목록
  const [values, setValues] = useState([
    { id: 1, name: 'foo', email: 'foo@test.com', selected: true },
    { id: 2, name: '', email: '-', selected: false },
    { id: 3, name: 'bar', email: 'bar@test.com', selected: false },
  ]);

  // 데이터 추가
  const onClickAdd = () => {
    console.log('> onClickAdd');
    const value = {
      ...data,
      id: nextId.current,
    };
    // 배열에 값을 추가함
    //setValues([...values, value]);
    setValues(values.concat(value));

    setData({ name: '', email: '' });
    nextId.current += 1;
  };

  // 데이터 삭제
  const onClickDel = (id) => {
    console.log('> onClickDel:', id);
    setValues(values.filter((it) => it.id !== id));
  };

  // 데이터 수정
  const onClickEdit = (item) => {
    setData(item);
    // 저장부분은 추후
  };

  // useMemo 사용예 (캐시 역할)
  // const count = countSelected(values); // 매번 계산됨
  const count = useMemo(() => countSelected(values), [values]); //2nd 인자는 deps 배열로 변경시 값 갱신

  // useCallback 사용예(useMemo활용): 기존 컴포넌트 리렌더시 함수새로 생성되는데 생성하지 않고 함수 재사용.
  const onClickDel2 = useCallback(
    (id) => {
      console.log('> onClickDel2:', id);
      setValues(values.filter((it) => it.id !== id));
    },
    [values]
  );

  // ex05. useReducer 사용: useState대신에 사용 가능, 업데이트 로직을 컴포넌트에서 분리 가능.
  // reducer는 현재 상태와 액션 객체를 인자로 받아서 새로운 상태로 변경하는 함수
  // function reducer(state, action) { ... return nextState; }
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

  // 사용자 hook 만들기:  use로 시작 (ex. useInput)
  /*
  function useInput(intialForm) {
    const [form, setForm] = useState(intialForm);

    const onChange = useCallback((ev) => {
      const { name, value } = ev.target;
      setForm((it) => ({
        ...form,
        [name]: value,
      }));
    }, []);

    return [form, onChange];
  }
  */

  // Context사용한 전역 데이터 관리
  // ex.
  // const UserCtx = React.createContext(null);
  // <UserCtx.Provider value={dispatch}>
  //   ....
  // </UserCtx.Provider>
  // Provider에 의해 감싸진 어느 곳에서 Context 값을 다른 곳에서 바로 사용 가능. 즉 dispatch을 어느곳에서도 호출 가능.
  // 사용예:
  // import React, { useContext } from 'react';
  // import UserDispatch from './users';
  // ...
  // const dispatch = useContext(UserDispatch);
  // ...
  // onClick={()=> dispatch({type:'SUCCESS', id: myid })};

  const [state, dispatch] = useReducer(reducer, 0);

  const onIncrease2 = () => {
    dispatch({ type: 'INC' });
  };

  const onDecrease2 = () => {
    dispatch({ type: 'DEC' });
  };

  // componentDidCatch 생명주기 메소드 사용하여 컴포넌트 에러 캐치
  /*
  componentDidCatch(err, info) {
    console.log('ERROR!!!');
  }
  */

  return (
    <>
      <h1>Test01</h1>
      <hr alt="ex01" />

      <Hello2 name="foo" color="green" />
      <Hello2 color="green" isReact={true} />
      {/* 단순히 isReact만 해도 true */}

      <hr alt="ex02" />

      <div>{value}</div>
      <button onClick={onIncrease}>+1</button>
      <button onClick={onDescrease}>-1</button>

      <hr alt="ex03" />

      <input name="name" onChange={onChange} value={data.name} />
      <input
        name="email"
        onChange={onChange}
        value={data.email}
        ref={nickInput}
      />
      <button onClick={onClickValue}>값수정</button>
      <button onClick={onClickAdd}>추가</button>
      <div>
        {data.name}, {data.email} / {dataStr}
      </div>

      <hr alt="ex04" />

      <div>
        {values.map((item) => (
          <Item
            item={item}
            onClickDel={onClickDel}
            onClickEdit={onClickEdit}
            onClickDel2={onClickDel2}
            key={item.id}
          />
        ))}
        <div>
          선택수: {count} / {values.length}
        </div>
      </div>

      <hr alt="ex05" />
      <div>
        <h1>{state}</h1>
        <button onClick={onIncrease2}>+1</button>
        <button onClick={onDecrease2}>-1</button>
      </div>
      <hr />
    </>
  );
}
