import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

import { motion } from "framer-motion";

// Componente de la barra de navegación
const Navbar = () => {
  // Obtener el estado de autenticación y la función de logout desde el AuthContext
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Manejar el evento de logout
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    // Barra de navegación con enlaces condicionales según el estado de autenticación
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="w-full bg-white shadow-sm border-b border-gray-200"
    >
      <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-lg font-semibold text-gray-800">
          TodoApp
        </Link>

        {/* Si el usuario está autenticado, mostrar enlaces a Tareas y Logout; de lo contrario, mostrar enlace a Login */}
        {isAuthenticated && user ? (
          <div className="flex items-center gap-5">
            <Link
              to="/tasks"
              className="text-sm text-gray-600 hover:text-black transition"
            >
              Tareas
            </Link>
            <span className="flex items-center gap-2 text-sm text-gray-800">
              <div className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center text-xs shrink-0">
                {user.username[0].toUpperCase()}
              </div>
              {user.username}
            </span>
            <button
              onClick={handleLogout}
              className="text-sm text-gray-600 hover:text-black transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="text-sm text-gray-600 hover:text-black transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-sm bg-black text-white px-3 py-1.5 rounded-lg hover:bg-gray-800 transition"
            >
              Registrarse
            </Link>
          </div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
