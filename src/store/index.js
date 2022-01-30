import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import counter from './counter';
import auth, { saveAuth } from './auth';
import { isDev } from 'utils/cmm';

// logger 미들웨어
const logger =
  ({ getState }) =>
  (next) =>
  (action) => {
    console.group(`> redux action: %c${action.type}`, 'font-weight: 600;');
    console.log('before state:', getState());
    const result = next(action);
    console.log('after state:', getState());
    console.groupEnd();
    return result;
  };

// thunk 미들웨어
const thunk =
  ({ dispatch, getState }) =>
  (next) =>
  (action) =>
    'function' === typeof action ? action(dispatch, getState) : next(action);

/* dispatch 호출하는 곳에서 action을 함수 사용
dispatch((dispatch, getState) => {
  dispatch({ type: 'FOO' });
  dispatch({ type: 'BAR' });
});

별도 함수로 처리하기에 async/await도 가능
dispatch(async (dispatch, getState) => {
  const payload = await foo();
  dispatch({ type:'FOO', payload });
});
*/

const reducers = combineReducers({ counter, auth });
console.log('> reducers:', reducers);
// middleware 여러개인 경우 chain-reaction으로 실행순서에 주의
let middleware = applyMiddleware(thunk, logger, saveAuth);
if (isDev) {
  middleware = composeWithDevTools(middleware);
}

const store = createStore(reducers, middleware);

export default store;
