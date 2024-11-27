import React, { useState } from 'react';
import Notification from '../components/Notification'; // Ensure the Notification component is correctly implemented
import { useNavigate } from 'react-router-dom';


function TaskCard({ task }) {
  const [notification, setNotification] = useState(null); // State for notification
  const navigate = useNavigate(); // Hook for navigation


  const showNotification = (content, accepted) => {
    setNotification({ content, accepted });

    setTimeout(() => {
      setNotification(null);
    }, 2500);
  };

  const markAsDone = async () => {
    try {
      const response = await fetch('http://localhost:3000/delete-task', {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: task._id }),
      });

      if (!response.ok) {
        throw new Error('Failed to mark the task as completed');
      }

      const data = await response.json();
      showNotification(data.message, true);
      console.log('Task marked as completed:', data);
      location.reload()
      
    } catch (error) {
      showNotification('An error occurred while completing the task', false);
      console.error('Error during the request:', error);
    }
  };

  return (
    <div className="bg-zinc-800 p-10 flex flex-col justify-center gap-4 w-full h-fit rounded-md">
      <h2 className="text-2xl font-bold">{task.title}</h2>
      <p className="text-xl">{task.description}</p>
      <p className="text-xs text-gray-400">Created: {task.date}</p>
      <p className="text-xs text-gray-400 underline decoration-indigo-600 decoration-2 underline-offset-4">
        Due Date: {task.due}
      </p>
      <button
        onClick={markAsDone}
        className="bg-indigo-600 text-white p-4 mt-4 rounded-md hover:bg-indigo-700 transition-colors duration-300"
      >
        Done
      </button>

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

export default TaskCard;
