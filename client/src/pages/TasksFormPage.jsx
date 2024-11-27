import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Notification from '../components/Notification'; // If you have a notification component
import { useNavigate } from 'react-router-dom';

function TasksFormPage() {
  const { register, handleSubmit, reset } = useForm();
  const [notification, setNotification] = useState(null); // State for notification
  const navigate = useNavigate(); // Hook for navigation


  const showNotification = (content, accepted) => {
    setNotification({ content, accepted });

    setTimeout(() => {
      setNotification(null);
    }, 2500);
  };

  const formatDate = (date) => {
    const [year, month, day] = date.split('-'); // Split date into parts
    return `${day}/${month}/${year}`; // Return in DD/MM/YYYY format
  };

  const onSubmit = async (data) => {
    // Format the date before sending to the backend
    const formattedData = {
      ...data,
      due: formatDate(data.due),
    };

    console.log(formattedData);

    try {
      const response = await fetch('http://localhost:3000/create-task', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
      });

      const data = await response.json();
      if (response.ok) {
        showNotification(data.message, true)
        reset();
      } else {
        showNotification(data.message, false)

      }
    } catch (error) {
      console.error('Request error:', error);
      showNotification('Error connecting to the server', 'denied');
    }
  };

  return (
    <div className="max-w-md bg-zinc-800 p-10 rounded-md m-auto my-10">
      <h1 className="text-xl text-white font-bold mb-4">Add Task</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 mb-4 mt-4"
      >
        <input
          type="text"
          placeholder="Title"
          {...register("title", { required: "Title is required" })}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md"
        />
        <textarea
          placeholder="Description"
          {...register("description", { required: "Description is required" })}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md h-28"
        />
        <input
          type="date" // Use `date` type for the date picker
          {...register("due", { required: "Due date is required" })}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md"
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white p-4 rounded-md"
        >
          Save
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

export default TasksFormPage;
