import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("token/", { username, password });
      localStorage.setItem(ACCESS_TOKEN, res.data.access);
      localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
      navigate("/home");
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.25 }}
        transition={{ duration: 2 }}

      />

 
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", duration: 1 }}
        className="relative z-10 w-full max-w-md rounded-2xl bg-white/90 p-8 shadow-2xl backdrop-blur-lg"
      >
        <motion.h2
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-6 text-center text-3xl font-extrabold text-gray-900"
        >
          Welcome Back
        </motion.h2>

        {error && (
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="mb-4 rounded-md bg-red-100 p-3 text-sm text-red-600"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <motion.div whileFocus={{ scale: 1.02 }}>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow focus:border-indigo-500 focus:ring focus:ring-indigo-300"
            />
          </motion.div>

          <motion.div whileFocus={{ scale: 1.02 }}>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow focus:border-indigo-500 focus:ring focus:ring-indigo-300"
            />
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 12px rgba(79,70,229,0.7)" }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white shadow-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-400"
          >
            Sign In
          </motion.button>
        </form>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-4 text-center text-sm text-gray-700"
        >
          Don’t have an account?
          <Link to="/signup" className="font-semibold text-indigo-600 hover:underline">
            Sign Up
          </Link>
          
        </motion.p>
      </motion.div>
    </div>
  );
}

export default Login;

