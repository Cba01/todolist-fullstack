import { useEffect, useState } from "react";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../services/tasksService";

import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

import EmptyState from "../components/EmptyState";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const newTask = await createTask(title);
      setTasks((prev) => [...prev, newTask]);
      setTitle("");
      toast.success("Tarea creada");
    } catch (err) {
      console.error(err);
      toast.error("Algo salió mal");
    }
  };

  const handleToggle = async (task) => {
    const updated = await updateTask(task.id, {
      ...task,
      completed: !task.completed,
    });
    // Actualizar el estado de la lista de tareas con la tarea actualizada (revisa la lista y reemplaza la tarea que coincide con el id)
    setTasks((prev) => prev.map((t) => (t.id === task.id ? updated : t)));
  };

  const handleEdit = async (id) => {
    const updated = await updateTask(id, { title: editingTitle });
    setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));

    // Salir del modo edición
    setEditingId(null);
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
    toast.success("Tarea eliminada");
  };

  if (loading) return <p>Cargando tareas...</p>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full max-w-md mt-12 bg-white rounded-2xl shadow-md p-8"
    >
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Mis tareas</h1>
      <form onSubmit={handleCreate} className="flex gap-2 mb-6">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Nueva tarea"
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
        />
        <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition">
          Agregar
        </button>
      </form>

      <AnimatePresence>
        <ul className="space-y-3">
          {/* Renderizar la lista de tareas */}
          {tasks.map((task) => (
            <motion.li
              key={task.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3 hover:shadow-sm transition"
            >
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggle(task)}
                className="mr-3 accent-black"
              />

              {/* Si la tarea está en modo edición, mostrar el input para editar; de lo contrario, mostrar el título y el botón de editar*/}
              {editingId === task.id ? (
                <>
                  <input
                    value={editingTitle}
                    onChange={(e) => setEditingTitle(e.target.value)}
                  />
                  <button onClick={() => handleEdit(task.id)}>Guardar</button>
                </>
              ) : (
                <>
                  {/* Mostrar el título de la tarea con estilo condicional según si está completada */}
                  <span
                    className={`transition ${
                      task.completed
                        ? "line-through text-gray-400"
                        : "text-gray-800"
                    }`}
                  >
                    {task.title}
                  </span>

                  {/* Botón para activar el modo edición */}
                  <button
                    onClick={() => {
                      setEditingId(task.id);
                      setEditingTitle(task.title);
                    }}
                    className="text-sm text-blue-600 hover:underline mr-2"
                  >
                    Editar
                  </button>
                </>
              )}

              {/* Botón para eliminar la tarea */}
              <button
                onClick={() => handleDelete(task.id)}
                className="text-sm text-red-500 hover:underline"
              >
                Eliminar
              </button>
            </motion.li>
          ))}
        </ul>
      </AnimatePresence>
    </motion.div>
  );
};

export default Tasks;
