import React, { useEffect, useState } from 'react';

function Notification({ content, accepted }) {
  const [isVisible, setIsVisible] = useState(false); // Initial state is hidden

  useEffect(() => {
    // Delay to trigger the sliding animation after mounting
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 50); // Small delay to ensure the animation is triggered

    // Automatically hide the notification after 2 seconds
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 2100); // Includes the delay + animation duration

    return () => {
      clearTimeout(showTimer); // Cleanup show timer
      clearTimeout(hideTimer); // Cleanup hide timer
    };
  }, []);

  return (
    <div
      className={`fixed top-8 right-8 transition-all duration-700 ease-in-out transform ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      } p-4 rounded-md shadow-md max-w-md ${
        accepted ? 'bg-blue-500 text-white' : 'bg-red-500 text-white'
      }`}
    >
      <p className="font-medium">{content}</p>
    </div>
  );
}

export default Notification;
