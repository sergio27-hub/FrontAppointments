import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import logo from "../assets/images/4.png";

const Register = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const requestBody = {
      username: data.username,
      password: data.password,
      email: data.email,
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        console.log('Registration successful');
        setIsSuccess(true);
        setTimeout(() => {
          navigate('/');
        }, 2000); // Redirect after 2 seconds
      } else {
        console.log('Registration error');
        setIsSuccess(false); // Handle error
      }
    } catch (error) {
      console.error('Error:', error);
      setIsSuccess(false); // Handle error
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="appointment w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <img src={logo} alt="logo" className="w-32 h-32 mx-auto" />
        <h2 className="text-2xl font-bold text-center">Register</h2>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700" htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              {...register('username', { required: 'This field is required' })}
            />
            {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700" htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              {...register('email', {
                required: 'This field is required',
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: 'Invalid email address',
                },
              })}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700" htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              {...register('password', {
                required: 'This field is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters',
                },
              })}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700" htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              {...register('confirmPassword', {
                required: 'This field is required',
                validate: (value) =>
                  value === watch('password') || 'Passwords do not match',
              })}
            />
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Register
          </button>
          <button
            type="button"
            className="w-full px-4 py-2 mt-2 text-white bg-gray-500 rounded hover:bg-gray-600"
            onClick={() => navigate('/')}
          >
            Home
          </button>
        </form>
        {isSuccess && (
          <div className="mt-4 p-4 text-green-700 bg-green-100 border border-green-400 rounded">
            Registration successful! Redirecting...
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
