import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [auth, setAuth] = useState({
    token: localStorage.getItem("access") || localStorage.getItem("ACCESS_TOKEN"),
    username: localStorage.getItem("username") || localStorage.getItem("USERNAME"),
    profile_picture: localStorage.getItem("profile_picture") || null,
  });

  const navigate = useNavigate();
  const isAuthenticated = !!auth.token;
  const dropdownRef = useRef();

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("username");
    localStorage.removeItem("USERNAME");
    localStorage.removeItem("profile_picture");
    window.dispatchEvent(new Event("authChange"));
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() === "") return;
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    setSearchQuery("");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-20 bg-white/10 backdrop-blur-lg border-b border-white/20 shadow-md">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="text-xl font-extrabold bg-gradient-to-r from-indigo-400 to-pink-500 bg-clip-text text-transparent"
        >
          E-vocational Learning
        </Link>

        <div className="hidden md:flex items-center space-x-4">
          <Link to="/" className="text-white hover:text-pink-400 transition">
            Home
          </Link>
          <Link to="/lessons" className="text-white hover:text-pink-400 transition">
            Explore
          </Link>

          <form onSubmit={handleSearch} className="flex items-center gap-2">
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

          {/* Profile Icon */}
          {isAuthenticated && (
            <div className="relative ml-4" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-lg hover:bg-indigo-700 transition overflow-hidden"
              >
                {auth.profile_picture ? (
                  <img
                    src={auth.profile_picture}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  auth.username ? auth.username.charAt(0).toUpperCase() : "U"
                )}
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg py-2 z-50">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Go to Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          {/* If not authenticated */}
          {!isAuthenticated && (
            <>
              <Link to="/login" className="text-white hover:text-pink-400 transition">
                Login
              </Link>
              <Link to="/signup" className="text-white hover:text-pink-400 transition">
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="text-white md:hidden ml-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
              <button type="submit" className="px-3 py-1 rounded-r-full bg-indigo-600 text-white hover:bg-indigo-700">
                Go
              </button>
            </form>

            {isAuthenticated ? (
              <>
                <Link to="/profile" className="text-white hover:text-pink-400 transition">
                  Go to Profile
                </Link>
                <button onClick={handleLogout} className="text-white hover:text-red-400 transition">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-white hover:text-pink-400 transition">
                  Login
                </Link>
                <Link to="/signup" className="text-white hover:text-pink-400 transition">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;














