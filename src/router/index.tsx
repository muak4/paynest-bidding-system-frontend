import React from 'react';
import { useRoutes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import ItemDetailsPage from '../pages/ItemDetailsPage';
import LoginPage from '../pages/LoginPage';
import RedirectIfAuthenticated from './RedirectIfAuthentiated';
import AddItemPage from '../pages/AddItemPage';

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
      path: '/add-item',
      element: <AddItemPage />,
    },
    {
      path: '/items/:itemId',
      element: <ItemDetailsPage />,
    },
  ]);
  return routes;
};

export default RouterComponent;
