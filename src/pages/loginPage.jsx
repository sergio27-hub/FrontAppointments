import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import logo from "../assets/images/4.png";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const isEmail = data.identifier.includes('@');
    const requestBody = isEmail
      ? { email: data.identifier, password: data.password }
      : { username: data.identifier, password: data.password };

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const { token, user } = await response.json();
        localStorage.setItem('token', token);
        localStorage.setItem('id', user);
        console.log('Login successful');
        navigate('/');
      } else {
        console.log('Login error');
        setLoginError('Invalid username/email or password');
      }
    } catch (error) {
      console.error('Error:', error);
      setLoginError('An error occurred. Please try again.');
    }
  };

  const navigateToRegister = () => {
    navigate('/register');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <img src={logo} alt="logo" className="w-32 h-32 ml-32" />
        <h2 className="text-5xl font-bold text-center">Login</h2>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block mb-1 text-sm font-bold text-gray-700 font-serif" htmlFor="identifier">Username or email</label>
            <input
              type="text"
              name="identifier"
              id="identifier"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              {...register('identifier', { required: 'This field is required' })}
            />
            {errors.identifier && <p className="text-red-500 text-xs mt-1">{errors.identifier.message}</p>}
          </div>
          <div>
            <label className="block mb-1 text-sm font-bold text-gray-700 font-serif" htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              {...register('password', { required: 'This field is required' })}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 font-serif"
          >
            Login
          </button>
          <button
            type="button"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 font-serif"
            onClick={() => navigate('/')}
          >
            HomePage
          </button>
        </form>
        {loginError && (
          <div className="mt-4 p-4 text-red-700 bg-red-100 border border-red-400 rounded">
            {loginError}
          </div>
        )}
        <div className="mt-4 text-center">
          <p className="text-1xl font-serif">
            Don't have an account?{' '}
            <button
              className="text-blue-500 hover:underline"
              onClick={navigateToRegister}
            >
              Register
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;



