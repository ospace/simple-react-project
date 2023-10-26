export function bindEmit(type, ...argNames) {
  return function (dispatch, ...args) {
    const action = { type };
    argNames.forEach((it, idx) => {
      action[argNames[idx]] = args[idx];
    });
    dispatch(action);
  };
}

export function createReducer(handlers, initialState) {
  return function (state = initialState, action) {
    const handler = handlers[action.type];
    return 'function' === typeof handler ? handler(state, action) : state;
  };
}

export const isDevelopment = process.env.REACT_APP_ENV === 'development';

export function bindValue(setter) {
  console.assert('function' === typeof setter);
  return function ({ target: { value } }) {
    setter(value);
  };
}

export function bindFilters() {
  const args = arguments;
  return function (val) {
    Array.prototype.forEach.call(args, function (filter) {
      val = filter(val);
    });
    return val;
  };
}
