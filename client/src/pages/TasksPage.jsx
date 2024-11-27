import React, { useState, useEffect } from 'react';
import TaskCard from '../components/TaskCard';
import { Link } from 'react-router-dom';

function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:3000/get-tasks', {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Error al obtener las tareas');
        }

        const data = await response.json();
        setTasks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) return <p>Cargando tareas...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className='w-full h-fit flex flex-col p-10 gap-5'>
      <div className='w-full h-fit flex flex-row justify-between items-center mb-4'>
      <h1 className="text-xl text-white font-bold">Task List</h1>
      <Link to='/add-task'><button className="bg-indigo-600 text-white py-4 px-14 rounded-md hover:bg-indigo-700 transition-colors duration-300">Add Task</button></Link>
      </div>
      {tasks.length === 0 ? (
        <p>No hay tareas disponibles</p>
      ) : (
        <div className="flex flex-col gap-4 md:grid md:grid-cols-3 lg:grid lg:grid-cols-4">
          {tasks.map((task) => (
            <TaskCard key={task._id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
}

export default TasksPage;
