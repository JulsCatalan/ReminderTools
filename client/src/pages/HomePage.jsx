import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="text-center p-6">
      {/* Hero Image */}
      <img
        src='/remindertools_cozy_landing.png' 
        alt="Reminder Tools Illustration" 
        className="mx-auto w-1/2 h-auto mb-10 rounded-lg shadow-md select-none pointer-events-none"
      />

      {/* Main Heading */}
      <h1 className="text-5xl font-bold my-4">Reminder Tools</h1>
      <span className="text-gray-500">Made by <a href="https://juls.tech/" target='_blank' className='underline decoration-indigo-600 decoration-2 underline-offset-4'>Juls</a></span>

      {/* Buttons Section */}
      <div className="flex justify-center gap-4 mt-6">
        <Link to='/register'>
          <button className="bg-indigo-600 text-white p-4 mt-4 rounded-md hover:bg-indigo-700 transition-colors duration-300">
            Get Started
          </button>
        </Link>
        <button className="bg-gray-600 text-white p-4 mt-4 rounded-md hover:bg-gray-700 transition-colors duration-300">
          Learn More
        </button>
      </div>

      {/* Subheading */}
      <h2 className="text-2xl font-semibold mt-8">Less is More</h2>

      {/* Paragraph */}
      <p className="text-gray-600 my-8 max-w-lg mx-auto leading-relaxe">
        Another task organization app? Yes, but it's not about who invents it
        first, but who does it better. This is my attempt to unlearn and learn.
        <br />
        <strong>GitHub Repo:</strong> <a href="https://github.com/JulsCatalan/ReminderTools" className="text-indigo-500 hover:underline">View on GitHub</a>
        <br />
        <span className="block mt-4">Special thanks to Fazt Code for teaching me React.</span>
        <span className="block mt-4">v1.1</span>
      </p>
    </div>
  );
}

export default HomePage;
