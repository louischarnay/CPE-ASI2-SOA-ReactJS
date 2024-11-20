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
import Game from './pages/Game/Game';
import GamePrep from './pages/GamePrep/GamePrep';
import { configureStore } from '@reduxjs/toolkit';
import globalReducer from './core/reducers';
import { Provider } from 'react-redux';
import Create from './pages/Create/Create';
import ProtectedRoute from './routes/ProtectedRoot';

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
        path: "game-prep",
        element : <GamePrep />,
      },
      // Les routes protégées
      {
        path: "create",
        element: <ProtectedRoute element={<Create />} /> // Protège la route "create"
      },
      {
        path: "buy",
        element: <ProtectedRoute element={<Buy />} /> // Protège la route "buy"
      },
      {
        path: "game",
        element: <ProtectedRoute element={<Game />} /> // Protège la route "sell"
      },
      {
        path: "sell",
        element: <ProtectedRoute element={<Sell />} /> // Protège la route "sell"
      }
    ]
  }
]);

const store = configureStore({
  reducer: globalReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: ['SET_MESSAGES_PRIVATE'],
            ignoredPaths: ['payload.0.date'],  // Ignore la date dans les actions
        },
    }),
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
