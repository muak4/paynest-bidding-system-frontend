import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom'; // Correct imports from react-router-dom
import { selectCurrentUser } from '../store/slices/authSlice';
import { RootState } from '../store/store';

const RedirectIfAuthenticated: React.FC = () => {
  const user = useSelector((state: RootState) => selectCurrentUser(state));

  return user ? <Navigate to="/" replace /> : <Outlet />;
};

export default RedirectIfAuthenticated;
