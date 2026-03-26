import api from "../api/axios";

// Función para manejar el inicio de sesión
export async function login(username, password) {
  const response = await api.post("auth/login/", {
    username,
    password,
  });

  // Guardar tokens(respuesta de la API) en el almacenamiento local
  if (response.data.access) {
    localStorage.setItem("accessToken", response.data.access);
    localStorage.setItem("refreshToken", response.data.refresh);
  }

  return response.data;
}

// Función para manejar el registro de nuevos usuarios
export async function register(username, email, password) {
  const response = await api.post("auth/register/", {
    username,
    email,
    password,
  });

  return response.data;
}


export async function getMe() {
  const response = await api.get("auth/me/");
  return response.data;
}

