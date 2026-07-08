import { createContext, useEffect, useState } from "react";
import { login as loginService, getMe } from "../auth/authService";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);
  // Agregar estado de carga si es necesario )
  const [loading, setLoading] = useState(true);

  // Determinar si el usuario está autenticado
  const isAuthenticated = !!accessToken;

  // Cargar el token de acceso desde el almacenamiento local automaticamente al usar la funcion AuthProvider
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setAccessToken(token);

      getMe()
        .then(setUser)
        .catch(() => {
          localStorage.clear();
          setAccessToken(null);
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  // Función para manejar el inicio de sesión
  const login = async (username, password) => {
    const data = await loginService(username, password);
    setAccessToken(data.access);

    const me = await getMe();
    setUser(me);
  };

  // Función para manejar el cierre de sesión
  const logout = () => {
    localStorage.clear();
    setAccessToken(null);
    setUser(null);
  };

  // Proveer el estado y las funciones de autenticación a los componentes hijos
  return (
    <AuthContext.Provider
      value={{
        accessToken,
        setAccessToken,
        isAuthenticated,
        login,
        logout,
        loading,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
