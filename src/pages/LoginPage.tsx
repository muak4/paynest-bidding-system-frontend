// src/pages/LoginPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../store/slices/api/apiSlice';
import { setCredentials } from '../store/slices/authSlice';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('test_user_1');
  const [password, setPassword] = useState('password1');
  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Please enter both email and password.');
      return;
    }

    try {
      const resposneData = await login({ username, password }).unwrap();
      dispatch(setCredentials(resposneData));
      navigate('/');
    } catch (err: any) {
      setError(err.data?.message || 'Failed to login. Please try again.');
    }
  };

  return (
    <div className="py-[10px] md:py-[20px] lg:py-[30px] xl:py-[40px]">
      <div className="container mx-auto max-w-[700px]">
        <div className="space-y-[15px] mb-[20px] max-w-[450px] mx-auto text-center">
          <h2 className="font-bold text-[25px] md:text-[30px] lg:text-[35px] leading-tight text-[#0f1c62] mb-4">
            Login to Your Account
          </h2>
          <p className="text-gray-600 mb-4">
            Welcome back! Please enter your credentials to log in and continue.
          </p>
          <p className="text-gray-500 text-sm mb-6">
            For testing purposes, there are 100 test user accounts available.
            Simply use the username and password format below:
          </p>
          <div className="bg-gray-100 p-4 rounded-md mb-6">
            <p className="text-sm font-semibold text-gray-700">
              Example: <span className="text-[#32d8c2]">username</span>:
              test_user_1, test_user_2 <br />
              <span className="text-[#32d8c2]">password</span>: password1,
              password2
            </p>
          </div>
        </div>

        <div className="bg-[#F8F6F5] rounded-[20px] p-[30px] sm:p-[55px]">
          <form onSubmit={handleSubmit} className="space-y-[25px]">
            {error && <p className="text-red-500">{error}</p>}

            <div>
              <label
                htmlFor="email"
                className="font-bold text-black text-[14px] md:text-[16px] block mb-[10px]"
              >
                Username
              </label>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-white text-[#4A4E4B] border border-[#bbb4b4] rounded-[6px] h-[54px] block w-full py-[5px] px-[25px] focus:outline-none placeholder-[#4A4E4B]"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="font-bold text-black text-[14px] md:text-[16px] block mb-[10px]"
              >
                Password
              </label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white text-[#4A4E4B] border border-[#bbb4b4] rounded-[6px] h-[54px] block w-full py-[5px] px-[25px] focus:outline-none placeholder-[#4A4E4B]"
              />
            </div>

            <div>
              <button
                type="submit"
                className="py-[15px] px-[30px] block w-full rounded-[6px] bg-primary-color text-white font-semibold text-[16px] md:text-[18px] transition duration-500 ease-in-out hover:bg-secondary-color"
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Login Now'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
