import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Notification from '../components/Notification';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const { register, handleSubmit } = useForm();
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [notification, setNotification] = useState(null); // State for notification
  const navigate = useNavigate(); // Hook for navigation


  const showNotification = (content, accepted) => {
    setNotification({ content, accepted });

    setTimeout(() => {
      setNotification(null);
    }, 2500);
  };

  const onSubmit = async (values) => {
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok) {
        showNotification(data.message, true) // Show success notification
        location.replace('/');
      } else {
        showNotification(data.message, false) // Show error notification
      }
    } catch (error) {
      console.error('Error in the request:', error);
      setNotification({ content: 'Error connecting to the server', accepted: false }); // Show error notification
    }
  };

  return (
    <div className="max-w-md bg-zinc-800 p-10 rounded-md m-auto my-10">
      <h1 className="text-xl text-white font-bold mb-4">Login</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 mb-6 mt-6"
      >
        <input
          type="email"
          placeholder="Email"
          {...register('email', { required: 'Email is required' })}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md"
        />

        {/* Password Field with Toggle */}
        <div className="relative w-full">
          <input
            type={showPassword ? 'text' : 'password'} // Toggle between text and password
            placeholder="Password"
            {...register('password', { required: 'Password is required' })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md"
          />
          <span
            onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-200"
          >
            {showPassword ? '🙈' : '👁️'}
          </span>
        </div>

        <button
          type="submit"
          className="bg-indigo-600 text-white p-4 mt-4 rounded-md hover:bg-indigo-700 transition-colors duration-300"
        >
          Login
        </button>
      </form>

      {/* Notification Component */}
      {notification && (
        <Notification
          content={notification.content}
          accepted={notification.accepted}
        />
      )}
    </div>
  );
}

export default LoginPage;
