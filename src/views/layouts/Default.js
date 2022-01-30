import Header from 'views/layouts/Header';
import { Outlet } from 'react-router-dom';

// https://stackoverflow.com/questions/69999324/how-do-i-render-components-with-different-layouts-elements-using-react-router-do
// export default function Default({ children }) {
//   return (
//     <>
//       <Header />
//       <div>{children}</div>
//     </>
//   );
// }

export default function Default() {
  return (
    <>
      <Header />
      <div>
        <Outlet />
      </div>
    </>
  );
}
