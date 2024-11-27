import React, { useEffect, useState } from 'react';

function ProfilePage() {
  const [user, setUser] = useState(null); // Estado para almacenar los datos del usuario
  const [error, setError] = useState(null); // Estado para manejar errores
  const [loading, setLoading] = useState(true); // Estado para manejar el estado de carga

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:3000/get-user', {
          method: 'GET',
          credentials: 'include', // Permite enviar cookies al backend
        });

        if (!response.ok) {
          throw new Error((await response.json()).message || 'Error al obtener los datos');
        }

        const data = await response.json();
        setUser(data); // Guardar datos del usuario
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Error desconocido');
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.');
    if (!confirmDelete) return;

    try {
      const response = await fetch('http://localhost:3000/delete-user', {
        method: 'DELETE',
        credentials: 'include',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error((await response.json()).message || 'Error al eliminar la cuenta');
      }

      showNotification(data.message, true);
      setUser(null);

    } catch (err) {
      showNotification(err, false)
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="max-w-md bg-zinc-800 p-10 rounded-md m-auto my-10">
      <h1 className="text-xl text-white font-bold mb-4">User Profile</h1>
      {user && (
        <div>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <button 
            onClick={handleDeleteAccount} 
            className="mt-6 bg-red-600 text-white px-4 py-2 rounded  hover:bg-red-700 transition-colors duration-300"
          >
            Delete Account
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
