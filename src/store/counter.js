/*
리덕스 사용 주의
* 유일한 스토어 존재
* 상태는 읽기 전용(불변성 유지)
* 리듀서는 순수함수
*/

// import { useCallback } from 'react';

// import { createStore } from 'redux';

const settings = {
  counter: 0,
};

const INC = 'counter/INC';
const DEC = 'counter/DEC';
const SET = 'counter/SET';

export function increase() {
  return {
    type: INC,
  };
}

export const decrease = () => ({
  type: DEC,
});

export const set = (counter) => ({
  type: SET,
  counter,
});

export default function reducer(state = settings, action) {
  switch (action.type) {
    case INC:
      return { ...state, counter: state.counter + 1 };
    case DEC:
      return { ...state, counter: state.counter - 1 };
    case SET:
      return { ...state, counter: action.counter };
    default:
      return state;
  }
}

// const store = createStore(reducer);

// const listener = () => {
//   const state = store.getState();
//   console.log('> listener:', state);
// };

// const unsubscribe = store.subscribe(listener);

// store.dispatch(increase());
// store.dispatch(descrease());

// 각 상태에 따란 데이터 생성
export const reducerUtils = {
  initial: (initialData = null) => ({
    loading: false,
    data: initialData,
    error: null,
  }),
  loading: (prevState = null) => ({
    loading: true,
    data: prevState,
    error: null,
  }),
  success: (value) => ({
    loading: false,
    data: value,
    error: null,
  }),
  error: (error) => ({
    loading: false,
    data: null,
    error: error,
  }),
};

// 액션에 따른 처리
export const asyncAction = (type, key, keepData = false) => {
  const SUCCESS = `${type}_SUCCESS`;
  const ERROR = `${type}_ERROR`;
  return (state, action) => {
    switch (action.type) {
      case type:
        return {
          ...state,
          [key]: reducerUtils.loading(keepData ? state[key].data : null),
        };
      case SUCCESS:
        return {
          ...state,
          [key]: reducerUtils.success(action.payload),
        };
      case ERROR:
        return {
          ...state,
          [key]: reducerUtils.error(action.error),
        };
      default:
        return state;
    }
  };
};

/*
export function posts(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: {
          loading: true,
          data: null,
          error: null,
        },
      };
    case GET_POSTS_SUCCESS:
      return {
        ...state,
        posts: {
          loading: true,
          data: action.posts,
          error: null,
        },
      };
    case GET_POSTS_ERROR:
      return {
        ...state,
        posts: {
          loading: true,
          data: null,
          error: action.error,
        },
      };
    case GET_POST:
      return {
        ...state,
        post: {
          loading: true,
          data: null,
          error: null,
        },
      };
    case GET_POST_SUCCESS:
      return {
        ...state,
        post: {
          loading: true,
          data: action.post,
          error: null,
        },
      };
    case GET_POST_ERROR:
      return {
        ...state,
        post: {
          loading: true,
          data: null,
          error: action.error,
        },
      };
    default:
      return state;
  }
}

앞의 asyncAction을 적용하면 아래처럼 간단하게 구성가능

export function posts2(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
    case GET_POSTS_SUCCESS:
    case GET_POSTS_ERROR:
      return asyncAction(GET_POSTS, 'posts', true)(state, action);
    case GET_POST:
    case GET_POST_SUCCESS:
    case GET_POST_ERROR:
      return asyncAction(GET_POST, 'post')(state, action);
    default:
      return state;
  }
}
*/

// asyncCall에 의해서 리듀서 호출까지 자동으로 처리.
export const asyncCallThunk = (type, promiseFn) => {
  const SUCCESS = `${type}_SUCCESS`;
  const ERROR = `${type}_ERROR`;

  return (param) => async (dispatch) => {
    dispatch({ type, param });
    try {
      const value = await promiseFn(param);
      dispatch({ type: SUCCESS, value });
    } catch (e) {
      dispatch({ type: ERROR, error: e });
    }
  };
};

// redux-saga로 구현한예 (redux-saga 모듈 필요)
/*
import { call, put, takeEvery, all } from 'redux-saga/effects'

function *getPostsSaga() {
  try {
    const payload = yield useCallback(postAPI.getPosts);
    yield put({
      type: GET_POSTS_SUCCESS,
      payload
    });
  } catch(e) {
    yield put({
      tyipe: GET_POSTS_ERROR,
      error: true,
      payload: e,
    });
  }
}

다른 saga
function *getPostsSaga2() { ... }

saga 합치기 (sequence)

function *getSaga() {
  yield takeEvery(GET_POSTS, getPostsSaga);
  yield takeEvery(GET_POSTS, getPostsSaga2);
}

모든사가를 깨움.

function *rootSaga() {
  yield all([getSaga()]);
}

import createSagaMiddleware from 'redux-saga';

sagaMiddleware.run(rootSaga());

리듀서에서 역할을 제너레이터로 간접적으로 처리.
export const asyncCallSaga = (type, promiseFn) => {
  const SUCCESS = `${type}_SUCCESS`;
  const ERROR = `${type}_ERROR`;

  return function* saga(action) {
    try {
      const payload = yield call(promiseFn, action.payload);
      yield put({ type: SUCCESS, payload });
    } catch (error) {
      yield put({ type: ERROR, error });
    }
  };
};
*/
