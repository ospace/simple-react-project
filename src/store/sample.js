/*
리덕스 사용 주의
* 유일한 스토어 존재
* 상태는 읽기 전용(불변성 유지)
* 리듀서는 순수함수
*/

import { createStore } from 'redux';

const settings = {
  counter: 0,
  text: '',
  list: [],
};

const INC = 'counter/INC';
const DEC = 'counter/DEC';

function increase() {
  return {
    type: INC,
  };
}

const descrease = () => ({
  type: DEC,
});

function reducer(state = settings, action) {
  switch (action.type) {
    case INC:
      return { ...state, counter: state.counter + 1 };
    case DEC:
      return { ...state, counter: state.counter - 1 };
    default:
      return state;
  }
}

const store = createStore(reducer);

const listener = () => {
  const state = store.getState();
  console.log('> listener:', state);
};

// const unsubscribe = store.subscribe(listener);
store.subscribe(listener);

store.dispatch(increase());
store.dispatch(descrease());
