import { useState } from "react";
import { register } from "../auth/authService";
import { useNavigate } from "react-router-dom";

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
    <form onSubmit={handleSubmit}>
      <h2>Registro</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        placeholder="Usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button disabled={loading} className="bg-black text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-800 transition">
        {loading ? "Creando..." : "Registrarse"}
      </button>
    </form>
  );
}

export default Register;
