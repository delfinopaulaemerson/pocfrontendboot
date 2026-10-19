import { createBrowserRouter, RouterProvider, type RouteObject } from 'react-router-dom';
import LoginForm from './pages/LoginForm.jsx';
import Layout from './pages/Layout.jsx';
import Home from './pages/Home.jsx';
import CustomerComponent from './pages/CustomerComponent.jsx';
import FileUploadComponent from './pages/FileUploadComponent.jsx';
import ProducerComponent from './pages/ProducerComponent.jsx';

const routes : RouteObject[]= [
  {
    path: "/",
    element: <LoginForm />,
  },{
  
    path: "/app",
    element: <Layout />, 
    children: [
      {
        index: true, 
        element: <Home />,
      },
      {
        path: "customer",
        element: <CustomerComponent />,
      },
      {
        path: "customer/edit/:id",
        element: <CustomerComponent />,
      },
      {
        path: "customer/upload",
        element: <FileUploadComponent />,
      },
      {
        path: "customer/producer",
        element: <ProducerComponent />,
      }
    ],
  },
];

const router = createBrowserRouter(routes);

export default function App(): React.JSX.Element {
  return <RouterProvider router={router}/>;
}


