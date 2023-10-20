import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './component/Root.jsx';
import AuthProvider from './component/AuthProvider';
import Home from './component/Home';
import Login from './component/Login';
import Register from './component/Register';
import AddProduct from './component/AddProduct';
import MyCart from './component/MyCart';
import Error from './Error';
import PrivateRoute from './component/PrivateRoute';
import Details from './component/Details';
import Services from './component/Services';
import ProductDetails from './component/ProductDetails';
import UpdateProduct from './component/UpdateProduct';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <Error></Error>,
    children: [
      {
        path: '/',
        element: <Home></Home>,
        loader: ()=> fetch("/data.json")
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/register',
        element: <Register></Register>
      },
      {
        path: '/addProduct',
        element: <PrivateRoute><AddProduct></AddProduct></PrivateRoute>
      },
      {
        path: '/myCart',
        element: <PrivateRoute><MyCart></MyCart></PrivateRoute>,
        loader: ()=>fetch('http://localhost:5000/myCart')
      },
      {
        path: '/details/:name',
        element: <PrivateRoute><Details></Details></PrivateRoute>,
        loader: ({params})=> fetch(`http://localhost:5000/brand/${params.name}`)
      },
      {
        path: '/services',
        element: <Services></Services>,
      },
      {
        path:'/productDetails/:id',
        element: <PrivateRoute><ProductDetails></ProductDetails></PrivateRoute>,
        loader: ({params})=> fetch(`http://localhost:5000/products/${params.id}`)
      },
      {
        path: '/updateProduct',
        element: <PrivateRoute><UpdateProduct></UpdateProduct></PrivateRoute>
      }
    ]
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      </AuthProvider>
  </React.StrictMode>,
)
