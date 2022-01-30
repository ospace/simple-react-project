export const isDev = process.env.REACT_APP_ENV === 'development';

export function bindEvent(type) {
  return (payload) => ({ type, payload });
}

export function newMiddleware(actor, setter) {
  console.assert('function' === typeof setter);

  return ({ getState }) =>
    (next) =>
    (action) => {
      setter(actor(getState(), action));
      return next(action);
    };
}

export function newReducer(handlers, initialState) {
  return (state = initialState, action) => reducer(handlers, state, action);
}

export function bindThunk(actor, eventTrigger) {
  return async (dispatch) => dispatch(eventTrigger(await actor()));
}

function reducer(handlers, state, action) {
  const handler = handlers[action.type];
  return 'function' === typeof handler ? handler(state, action.payload) : state;
}

export function newApi(axios, urlPath) {
  return {
    get(params) {
      params = params || {};
      params.t = Date.now();
      return axios.get(`${urlPath}`, { params });
    },
    getOne(id) {
      let params = { t: Date.now() };
      return axios.get(`${urlPath}/${id}`, { params });
    },
    create(req) {
      return axios.post(`${urlPath}`, req);
    },
    update(req) {
      return axios.put(`${urlPath}`, req);
    },
    delete(id) {
      let params = { t: Date.now() };
      return axios.delete(`${urlPath}/${id}`, { params });
    },
  };
}
