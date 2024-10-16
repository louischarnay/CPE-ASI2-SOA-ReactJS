import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Home from './pages/Home/Home';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import Root from './routes/Root';
import UserForm from './pages/UserForm/UserForm';
import Login from './pages/Login/Login';
import Buy from './pages/Buy/Buy';
import Sell from './pages/Sell/Sell';
import { configureStore } from '@reduxjs/toolkit';
import globalReducer from './core/reducers';
import { Provider } from 'react-redux';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Navigate to="/home" replace={true} />
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "register",
        element: <UserForm />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "buy",
        element: <Buy />,
      },
      {
        path: "sell",
        element: <Sell />,
      }
    ]
  }
]);

const store = configureStore({
  reducer: globalReducer,
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
