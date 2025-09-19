import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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

      navigate("/lessons"); 

    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">

      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">

        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Login
        </h2>

        {error && (
          <div className="mb-4 rounded-md bg-red-100 p-3 text-sm text-red-600">
            {error}

          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>

            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>

            <input
              type="text"

              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:ring focus:ring-indigo-200"
            />

          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:ring focus:ring-indigo-200"
            />

          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white shadow hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-300"
          >

            Sign In
          </button>
        </form>

        <p className="text-sm text-center text-gray-600">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;
