import React, { useState, createContext, useContext } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { increase, decrease } from 'store/counter';
import InputNumber from 'components/InputNumber';

// import test from 'api/todo';

// const initialState = {
//   data: {
//     loading: false,
//     data: null,
//     error: null,
//   },
//   item: {
//     loading: false,
//     data: null,
//     error: null,
//   },
// };

const DataContext = createContext(null);

export function useDataContext() {
  const state = useContext(DataContext);
  if (!state) throw new Error('no state');

  return state;
}

export default function Test03() {
  const [state] = useState(null);

  // const { number } = useSelector((state) => {
  //   console.log('> useSelector:', state);
  //   return {
  //     number: state.counter,
  //   };
  // });

  // store에서 필요한 상태를 획득
  const { number } = useSelector(
    (state) => ({
      number: state.counter.counter,
    }),
    shallowEqual // 객체로 리턴하는 경우 하나라고 변경되면 리렌더되서 불필요한 부하를 제거용
  );

  console.log('> number:', number);

  const dispatch = useDispatch();

  function onChangeNumber(val) {
    console.log('> onChangeNumber:', val);
  }
  //if (100 !== number) dispatch(set(100));
  // dispatch(set(100));

  return (
    <>
      <h1>Test03</h1>
      <DataContext.Provider value={state}>
        <div>
          {number}
          <button onClick={() => dispatch(increase())}>+</button>
          <button onClick={() => dispatch(decrease())}>-</button>
          <InputNumber onChange={onChangeNumber}></InputNumber>
        </div>
      </DataContext.Provider>
    </>
  );
}
