import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
        try {
          const response = await fetch('http://localhost:3000/verify-token', {
            method: 'GET',
            credentials: 'include',
          });
          if (response.ok) {
            setLoggedIn(true);
          } else {
            setLoggedIn(false);
          }
        } catch (error) {
          console.error('Error verifying token:', error);
          setLoggedIn(false);
        }
    };

    verifyToken();
  }, []);

  // Handle logout
  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:3000/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        setLoggedIn(false); // Update state
        navigate('/login'); // Redirect to login page
      } else {
        alert('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div className="bg-zinc-700 flex flex-row justify-between items-center rounded-md py-6 px-8 m-4">
      <h1 className="text-xl text-white font-bold">
        <Link to="/">ReminderTools</Link>
      </h1>
      <nav className="flex justify-center items-center gap-4">
        {!loggedIn ? (
          <>
            <Link to="/login" className="text-white">Login</Link>
            <Link to="/register" className="text-white">Sign Up</Link>
          </>
        ) : (
          <>
            <Link to="/tasks" className="text-white">Tasks</Link>
            <Link to="/profile" className="text-white">Profile</Link>
            <button onClick={handleLogout} 
            className="text-white flex flex-row items-center justify-center gap-2">
              Logout <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-logout"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" /><path d="M9 12h12l-3 -3" /><path d="M18 15l3 -3" /></svg>
            </button>
          </>
        )}
      </nav>
    </div>
  );
}

export default Navbar;
