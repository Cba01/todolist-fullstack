import axios from "axios";
import { useContext } from "react";
import { LoadingContext } from "../context/LoadingContext";

// Configurar una instancia de axios con la URL base de la API
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Interceptor para agregar el token de acceso a las solicitudes(request) al API
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      // Agregar el token de acceso en el encabezado Authorization (la api te pide el token en su config para hacer requests)
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para manejar respuestas(response) de los requests que contengan errores
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Obtener la solicitud original que causó el error
    const originalRequest = error.config;

    // Intentar refrescar el token si la respuesta es 401 (no autorizado)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refreshToken");

      // Intentar obtener un nuevo token de acceso usando el refreshToken
      try {
        const res = await axios.post(
          "http://127.0.0.1:8000/api/auth/refresh/",
          { refresh: refreshToken }
        );

        // Guardar el nuevo token de acceso en el almacenamiento local
        localStorage.setItem("accessToken", res.data.access);

        // Actualizar el encabezado Authorization y reintentar la solicitud original
        originalRequest.headers.Authorization = `Bearer ${res.data.access}`;

        return api(originalRequest);

        // Si el refreshToken es inválido o ha expirado, redirigir al usuario al login
      } catch (err) {
        localStorage.clear();
        window.location.href = "/login";
      }
    }
    // Si el error no es de autenticación, rechazar la promesa con el error
    return Promise.reject(error);
  }
);

export default api;
