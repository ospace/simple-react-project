import { useSelector } from 'react-redux';
// import auth from 'store/auth';

export function useAuth() {
  return useSelector((state) => {
    console.log('2>', state.auth);
    return state.auth;
  });
}
