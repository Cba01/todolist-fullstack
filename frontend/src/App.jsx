import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Navbar from "./components/Navbar";

import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Tasks from "./pages/Tasks";
import ProtectedRoute from "./routes/ProtectedRoute";

import { LoadingContext } from "./context/LoadingContext";
import Spinner from "./components/Spinner";

function App() {
  const { loading } = useContext(LoadingContext);

  // Mostrar un indicador de carga mientras se verifica la autenticación
  /* if (loading) {
    return <div>Loading...</div>;
  } */

  return (
    <>
      {/* Mostrar el spinner de carga si loading es true */}
      {loading && <Spinner />}

      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="flex justify-center">
          <AnimatePresence mode="wait">
            <Routes>
              {/* Ruta por defecto */}
              <Route
                path="*"
                element={
                  <PageWrapper>
                    <h1>404</h1>
                  </PageWrapper>
                }
              />

              {/* Públicas */}
              <Route
                path="/login"
                element={
                  <PageWrapper>
                    <Login />
                  </PageWrapper>
                }
              />

              <Route
                path="/register"
                element={
                  <PageWrapper>
                    <Register />
                  </PageWrapper>
                }
              />

              {/* Privadas */}
              <Route
                path="/tasks"
                element={
                  <ProtectedRoute>
                    <PageWrapper>
                      <Tasks />
                    </PageWrapper>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <PageWrapper>
                      <Tasks />
                    </PageWrapper>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}

function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.25 }}
    >
      {children}
    </motion.div>
  );
}

export default App;
