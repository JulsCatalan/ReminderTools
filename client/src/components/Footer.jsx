import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className="w-full flex flex-row justify-between items-center px-8 mt-20 mb-10">
      {/* Main site link */}
      <Link
        to="/"
        className="underline decoration-indigo-600 decoration-2 underline-offset-4 hover:text-indigo-500 transition-colors duration-200"
      >
        <p>remindertools.com</p>
      </Link>

      {/* Legal links */}
      <Link to="/legal">
        <nav className="w-fit flex flex-row items-center gap-4">
          <p className="hover:underline hover:decoration-slate-100 transition-all duration-200">
            Privacy Policy
          </p>
          <p className="hover:underline hover:decoration-slate-100 transition-all duration-200">
            Cookies
          </p>
        </nav>
      </Link>
    </div>
  );
}

export default Footer;
