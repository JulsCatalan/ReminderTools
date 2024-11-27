import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Estado de autenticación
  const [loading, setLoading] = useState(true); // Indicador de carga

  useEffect(() => {
    const verifyToken = async () => {
      try {
        // realiza la petición al backend
        const response = await fetch('http://localhost:3000/verify-token', {
          method: 'GET',
          credentials: 'include', // Asegura que las cookies se envíen con la solicitud
        });

        if (response.ok) {
          setIsAuthenticated(true); // Token válido
        } else {
          setIsAuthenticated(false); // Token inválido o expirado
        }
      } catch (error) {
        console.error('Error al verificar el token:', error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false); // La verificación ha terminado
      }
    };

    verifyToken();
  }, []);

  if (loading) {
    return <div>Cargando...</div>; // Mostrar indicador de carga
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
