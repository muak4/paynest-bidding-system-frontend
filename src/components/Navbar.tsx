// src/components/Navbar.tsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser, selectCurrentUser } from '../store/slices/authSlice';

const Navbar: React.FC = () => {
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/');
  };

  return (
    <nav className="bg-[#0f1c62] shadow-lg px-4 py-2">
      <div className="flex items-center justify-between">
        <div className="text-white font-bold text-lg">
          <Link to="/">AuctionHouse</Link>
        </div>
        <div className="flex space-x-6 items-center text-white">
          <Link to="/" className="hover:text-secondary-color transition-colors">
            Home
          </Link>
          {user ? (
            <>
              <span className="text-lg">Hello, {user.username}</span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition-all"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 bg-primary-color text-white rounded hover:bg-secondary-color transition-all"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
