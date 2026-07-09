import { useState } from "react";
import { register } from "../auth/authService";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await register(username, email, password);
      navigate("/login"); // o login automático
    } catch (err) {
      setError("No se pudo registrar el usuario");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm mt-12 bg-white rounded-2xl shadow-md p-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-1">
        Crea tu cuenta
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        Organiza tus tareas en un solo lugar
      </p>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2 mb-4">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
        />

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
        />

        <button
          disabled={loading}
          className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Creando..." : "Registrarse"}
        </button>
      </form>

      <p className="text-sm text-gray-500 mt-6 text-center">
        ¿Ya tienes cuenta?{" "}
        <Link to="/login" className="text-black font-medium hover:underline">
          Inicia sesión
        </Link>
      </p>
    </div>
  );
}

export default Register;
