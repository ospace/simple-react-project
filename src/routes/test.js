// import DefaultLayout from 'views/layouts/Default';

import Test01 from 'views/test/Test01';
import Test02 from 'views/test/Test02';
import Test03 from 'views/test/Test03';

const routeData = [
  { path: 'test01', element: <Test01 /> },
  {
    path: 'test02',
    element: <Test02 />,
    children: [{ path: ':name', element: <Test02 /> }],
  },
  { path: 'test02/:name', element: <Test02 /> },
  { path: 'test03', element: <Test03 /> },
];

// const routeData = [
//   {
//     path: '/',
//     element: <DefaultLayout />,
//     children: [
//       { path: '/test01', element: <Test01 /> },
//       {
//         path: '/test02',
//         element: <Test02 />,
//         children: [{ path: ':name', element: <Test02 /> }],
//       },
//       { path: '/test02/:name', element: <Test02 /> },
//       { path: '/test03', element: <Test03 /> },
//     ],
//   },
// ];

export default routeData;
