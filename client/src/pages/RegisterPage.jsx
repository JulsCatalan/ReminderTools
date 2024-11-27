import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Notification from '../components/Notification';
import { useNavigate, Link } from 'react-router-dom';

function RegisterPage() {
  const { register, handleSubmit, watch } = useForm();
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [notification, setNotification] = useState(null); // State for notification
  const navigate = useNavigate(); // Hook for navigation


  const showNotification = (content, accepted) => {
    setNotification({ content, accepted });

    setTimeout(() => {
      setNotification(null);
    }, 2500);
  };


  // Watch the termsAndConditions checkbox state
  const isTermsAccepted = watch('termsAndConditions', false);

  const onSubmit = async (values) => {
    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      if (response.ok) {
        showNotification(data.message, true);
        location.replace('/')
      } else {
        showNotification(data.message, false)
      }
    } catch (error) {
      console.error('Error in the request:', error);
      alert('Error in server');
    }
  };

  return (
    <div className="max-w-md bg-zinc-800 p-10 rounded-md m-auto my-10">
      <h1 className="text-xl text-white font-bold mb-4">Register</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 mb-6 mt-6"
      >
        <input
          type="text"
          placeholder="Username"
          {...register('username', { required: 'Username is required' })}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md"
        />
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

        {/* Terms and Conditions Checkbox */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="tac"
            {...register('termsAndConditions', { required: true })}
            className="mr-2 my-4"
          />
          <label htmlFor="tac" className="text-white">
            Accept <Link to="/legal" className="underline decoration-indigo-600 decoration-2 underline-offset-4">terms and conditions</Link>
          </label>
        </div>

        {/* Register Button */}
        <button
          type="submit"
          className={`p-4 mt-4 rounded-md transition-colors duration-300 ${
            isTermsAccepted
              ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
              : 'bg-gray-500 text-gray-300 cursor-not-allowed'
          }`}
          disabled={!isTermsAccepted} // Disable button if terms are not accepted
        >
          Register
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

export default RegisterPage;
