import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

// Protege las rutas que requieren autenticación
const ProtectedRoute = ({ children }) => {

  // Obtener el estado de autenticación desde el AuthContext
  const { isAuthenticated } = useContext(AuthContext);


// Si el usuario no está autenticado, redirigir al login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
