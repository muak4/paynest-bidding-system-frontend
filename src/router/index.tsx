// src/router/index.tsx
import React from 'react';
import { useRoutes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import ItemDetailsPage from '../pages/ItemDetailsPage';
import LoginPage from '../pages/LoginPage';
import RedirectIfAuthenticated from './RedirectIfAuthentiated';

const RouterComponent: React.FC = () => {
  const routes = useRoutes([
    {
      element: <RedirectIfAuthenticated />,
      children: [
        {
          path: 'login',
          element: <LoginPage />,
        },
      ],
    },
    {
      path: '/',
      element: <HomePage />,
    },
    {
      path: '/items/:itemId',
      element: <ItemDetailsPage />,
    },
  ]);
  return routes;
};

export default RouterComponent;
