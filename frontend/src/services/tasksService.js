import api from "../api/axios";

// Servicio para manejar las operaciones relacionadas con las tareas

// Obtener la lista de tareas desde la API
export const getTasks = async () => {
  const res = await api.get("tasks/");
  return res.data;
};

// Crear una nueva tarea con el título proporcionado
export const createTask = async (title) => {
  const res = await api.post("tasks/", { title });
  return res.data;
};

// Actualizar una tarea existente por su ID con los datos proporcionados
export const updateTask = async (id, data) => {
  const res = await api.put(`tasks/${id}/`, data);
  return res.data;
};


// Eliminar una tarea por su ID
export const deleteTask = async (id) => {
  await api.delete(`tasks/${id}/`);
};
