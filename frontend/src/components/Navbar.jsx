import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const [auth, setAuth] = useState({

    token: localStorage.getItem("access") || localStorage.getItem("ACCESS_TOKEN"),
    username: localStorage.getItem("username") || localStorage.getItem("USERNAME"),
  });

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const isAuthenticated = !!auth.token;

  useEffect(() => {

    const onAuthChange = () => {

      setAuth({
        token: localStorage.getItem("access") || localStorage.getItem("ACCESS_TOKEN"),
        username: localStorage.getItem("username") || localStorage.getItem("USERNAME"),
      });
    };

    window.addEventListener("authChange", onAuthChange);

    return () => window.removeEventListener("authChange", onAuthChange);
  }, []);

  const handleLogout = () => {
    
    localStorage.removeItem("access");
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("username");
    localStorage.removeItem("USERNAME");
    window.dispatchEvent(new Event("authChange"));
    navigate("/login");
  };

  const handleSearchChange = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (!value) {
      setSuggestions([]);
      return;
    }

    try {
      // Example: search endpoint that searches both skills and lessons
      const res = await api.get(`/search/?q=${encodeURIComponent(value)}`);
      setSuggestions(res.data); // assume backend returns [{id, type, title}]
    } catch (err) {
      console.error("Search error:", err);
      setSuggestions([]);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      setSuggestions([]);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-20 bg-white/10 backdrop-blur-lg border-b border-white/20 shadow-md">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="text-xl font-extrabold bg-gradient-to-r from-indigo-400 to-pink-500 bg-clip-text text-transparent"
        >
          E-vocational Learning
        </Link>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-white hover:text-pink-400 transition">
            Home
          </Link>
          <Link to="/lessons" className="text-white hover:text-pink-400 transition">
            Explore
          </Link>

          {!isAuthenticated ? (
            <>
              <Link to="/login" className="text-white hover:text-pink-400 transition">
                Login
              </Link>
              <Link to="/signup" className="text-white hover:text-pink-400 transition">
                Sign Up
              </Link>
            </>
          ) : (
            <button onClick={handleLogout} className="text-white hover:text-red-400 transition">
              Logout
            </button>
          )}
        </div>

        {/* Search input */}
        <div className="relative hidden md:flex items-center ml-6">
          <form onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Search skills or lessons..."
              value={query}
              onChange={handleSearchChange}
              className="bg-white/20 text-white placeholder-white/70 px-3 py-1 rounded-full outline-none w-64 focus:ring-2 focus:ring-indigo-400 transition"
            />
          </form>
          {suggestions.length > 0 && (
            <div className="absolute top-10 w-64 bg-white rounded-md shadow-lg max-h-60 overflow-y-auto z-50">
              {suggestions.map((item) => (
                <div
                  key={item.id}
                  className="px-4 py-2 hover:bg-indigo-100 cursor-pointer"
                  onClick={() => navigate(`/${item.type}/${item.id}`)}
                >
                  {item.title} <span className="text-gray-500 text-sm">({item.type})</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Profile & mobile */}
        <div className="flex items-center gap-4 ml-auto">
          {isAuthenticated && (
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full flex items-center justify-center bg-gradient-to-r from-indigo-400 to-pink-500 shadow-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="white"
                  viewBox="0 0 24 24"
                  className="w-6 h-6"
                >
                  <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                </svg>
              </div>
              <span className="text-white font-medium">{auth.username}</span>
            </div>
          )}

          <button
            className="text-white md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-7 h-7"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-7 h-7"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white/10 backdrop-blur-lg border-t border-white/20 shadow-md">
          <div className="flex flex-col items-center py-4 space-y-3">
            <Link to="/" className="text-white hover:text-pink-400 transition">Home</Link>
            <Link to="/lessons" className="text-white hover:text-pink-400 transition">Explore</Link>
            {!isAuthenticated ? (
              <>
                <Link to="/login" className="text-white hover:text-pink-400 transition">Login</Link>
                <Link to="/signup" className="text-white hover:text-pink-400 transition">Sign Up</Link>
              </>
            ) : (
              <>
                <button onClick={handleLogout} className="text-white hover:text-red-400 transition">Logout</button>
                <span className="text-white font-medium">{auth.username}</span>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;











