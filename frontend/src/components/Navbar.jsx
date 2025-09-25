import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [auth, setAuth] = useState({
    token: localStorage.getItem("access") || localStorage.getItem("ACCESS_TOKEN"),
    username: localStorage.getItem("username") || localStorage.getItem("USERNAME"),
  });

  const navigate = useNavigate();
  const isAuthenticated = !!auth.token;

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("username");
    localStorage.removeItem("USERNAME");
    window.dispatchEvent(new Event("authChange"));
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() === "") return;
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    setSearchQuery("");
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

        <form onSubmit={handleSearch} className="hidden md:flex items-center gap-2 ml-4">
          <input
            type="text"
            placeholder="Search skills or lessons..."
            className="bg-white/20 text-white placeholder-white/70 px-3 py-1 rounded-full outline-none focus:ring-2 focus:ring-indigo-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            type="submit"
            className="px-3 py-1 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium"
          >
            Search
          </button>
        </form>

        {/* Mobile Hamburger */}
        <button
          className="text-white md:hidden ml-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-7 h-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-7 h-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {isOpen && (
        <div className="md:hidden bg-white/10 backdrop-blur-lg border-t border-white/20 shadow-md">
          <div className="flex flex-col items-center py-4 space-y-3">
            <Link to="/" className="text-white hover:text-pink-400 transition">
              Home
            </Link>
            <Link to="/lessons" className="text-white hover:text-pink-400 transition">
              Explore
            </Link>

            <form onSubmit={handleSearch} className="flex w-full px-4">
              <input
                type="text"
                placeholder="Search..."
                className="flex-1 px-3 py-1 rounded-l-full bg-white/20 text-white placeholder-white/70 outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="px-3 py-1 rounded-r-full bg-indigo-600 text-white hover:bg-indigo-700"
              >
                Go
              </button>
            </form>

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
              <>
                <button onClick={handleLogout} className="text-white hover:text-red-400 transition">
                  Logout
                </button>
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












