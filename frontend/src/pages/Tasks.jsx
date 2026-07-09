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
    if (!editingTitle.trim()) return;

    const updated = await updateTask(id, { title: editingTitle });
    setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));

    // Salir del modo edición
    setEditingId(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingTitle("");
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
    toast.success("Tarea eliminada");
  };

  if (loading) {
    return (
      <div className="w-full max-w-md mt-12 bg-white rounded-2xl shadow-md p-8">
        <div className="animate-pulse space-y-3">
          <div className="h-6 w-32 bg-gray-200 rounded" />
          <div className="h-10 bg-gray-100 rounded-lg" />
          <div className="h-12 bg-gray-100 rounded-lg" />
          <div className="h-12 bg-gray-100 rounded-lg" />
        </div>
      </div>
    );
  }

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

      {tasks.length === 0 ? (
        <EmptyState
          title="No tienes tareas todavía"
          description="Agrega tu primera tarea usando el campo de arriba."
        />
      ) : (
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
                className="flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-3 hover:shadow-sm transition"
              >
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggle(task)}
                  className="accent-black shrink-0"
                />

                {/* Si la tarea está en modo edición, mostrar el input para editar; de lo contrario, mostrar el título y el botón de editar*/}
                {editingId === task.id ? (
                  <>
                    <input
                      autoFocus
                      value={editingTitle}
                      onChange={(e) => setEditingTitle(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleEdit(task.id)}
                      className="flex-1 border border-gray-300 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    <button
                      onClick={() => handleEdit(task.id)}
                      className="text-sm text-green-600 hover:underline shrink-0"
                    >
                      Guardar
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="text-sm text-gray-500 hover:underline shrink-0"
                    >
                      Cancelar
                    </button>
                  </>
                ) : (
                  <>
                    {/* Mostrar el título de la tarea con estilo condicional según si está completada */}
                    <span
                      className={`flex-1 truncate transition ${
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
                      className="text-sm text-blue-600 hover:underline shrink-0"
                    >
                      Editar
                    </button>

                    {/* Botón para eliminar la tarea */}
                    <button
                      onClick={() => handleDelete(task.id)}
                      className="text-sm text-red-500 hover:underline shrink-0"
                    >
                      Eliminar
                    </button>
                  </>
                )}
              </motion.li>
            ))}
          </ul>
        </AnimatePresence>
      )}
    </motion.div>
  );
};

export default Tasks;
