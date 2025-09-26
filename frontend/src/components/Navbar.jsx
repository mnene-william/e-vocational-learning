import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [auth, setAuth] = useState({
    token: localStorage.getItem("access") || localStorage.getItem("ACCESS_TOKEN"),
    username: localStorage.getItem("username") || localStorage.getItem("USERNAME"),
  });

  const navigate = useNavigate();
  const isAuthenticated = !!auth.token;

  // Add scroll effect for better glass appearance
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Listen for auth changes
  useEffect(() => {
    const handleAuthChange = () => {
      setAuth({
        token: localStorage.getItem("access") || localStorage.getItem("ACCESS_TOKEN"),
        username: localStorage.getItem("username") || localStorage.getItem("USERNAME"),
      });
    };

    window.addEventListener("authChange", handleAuthChange);
    return () => window.removeEventListener("authChange", handleAuthChange);
  }, []);

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
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Enhanced Glassmorphism Navbar */}
      <nav className={`
        container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between
        transition-all duration-300 ease-in-out
        ${scrolled 
          ? "bg-white/15 backdrop-blur-xl shadow-2xl border-b border-white/30" 
          : "bg-white/10 backdrop-blur-lg shadow-lg border-b border-white/20"
        }
      `}>
        {/* Logo with glass effect */}
        <Link
          to="/"
          className="text-xl font-extrabold bg-gradient-to-r from-indigo-300 to-pink-400 bg-clip-text text-transparent 
                     px-3 py-1 rounded-lg backdrop-blur-sm bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
        >
          E-vocational Learning
        </Link>

        {/* Centered Search with glass effect */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex flex-1 max-w-md mx-4 justify-center"
        >
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search skills or lessons..."
              className="w-full bg-white/15 text-white placeholder-white/70 px-4 py-2 rounded-full 
                         outline-none focus:ring-2 focus:ring-white/30 focus:bg-white/20
                         backdrop-blur-sm border border-white/20 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 
                         w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 
                         flex items-center justify-center transition-all backdrop-blur-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </form>

        {/* Right-side Nav Links + Profile */}
        <div className="hidden md:flex items-center space-x-3">
          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                className="text-white hover:text-white px-4 py-2 rounded-full 
                           backdrop-blur-sm bg-white/10 border border-white/10 hover:bg-white/20 
                           transition-all duration-200"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-white px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/90 to-pink-500/90 
                           hover:from-indigo-600 hover:to-pink-600 border border-white/20 
                           backdrop-blur-sm transition-all duration-200"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <div className="relative">
              {/* Profile Icon with glass effect */}
              <button
                className="w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center 
                           font-bold border border-white/20 backdrop-blur-sm hover:bg-white/30 
                           transition-all duration-200 shadow-lg"
                onClick={() => setProfileDropdown(!profileDropdown)}
              >
                {auth.username ? auth.username.charAt(0).toUpperCase() : "U"}
              </button>

              {/* Dropdown with glass effect */}
              {profileDropdown && (
                <div className="absolute right-0 mt-2 w-48 rounded-2xl shadow-2xl border border-white/20 
                              backdrop-blur-xl bg-white/15 py-2 z-20 animate-fade-in">
                  <div className="px-3 py-2 border-b border-white/10">
                    <p className="text-white/80 text-sm">Signed in as</p>
                    <p className="text-white font-medium truncate">{auth.username}</p>
                  </div>
                  <button
                    onClick={() => {
                      navigate("/profile");
                      setProfileDropdown(false);
                    }}
                    className="block w-full text-left px-4 py-3 text-white/90 hover:bg-white/10 
                               transition-all duration-150 border-b border-white/5"
                  >
                    👤 Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-3 text-white/90 hover:bg-white/10 
                               transition-all duration-150 text-red-200 hover:text-red-100"
                  >
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="text-white md:hidden ml-2 w-10 h-10 rounded-lg backdrop-blur-sm 
                     bg-white/10 border border-white/10 hover:bg-white/20 flex items-center justify-center
                     transition-all duration-200"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* Enhanced Mobile Menu */}
      {isOpen && (
        <div className="md:hidden fixed inset-x-0 top-16 mt-2 mx-4 rounded-2xl shadow-2xl 
                      border border-white/20 backdrop-blur-xl bg-white/15 animate-slide-down">
          <div className="flex flex-col items-center py-6 space-y-4">
            <Link 
              to="/" 
              className="text-white/90 hover:text-white px-6 py-3 rounded-full w-4/5 text-center
                         backdrop-blur-sm bg-white/10 border border-white/10 hover:bg-white/20 transition-all"
              onClick={() => setIsOpen(false)}
            >
               Home
            </Link>
            <Link 
              to="/lessons" 
              className="text-white/90 hover:text-white px-6 py-3 rounded-full w-4/5 text-center
                         backdrop-blur-sm bg-white/10 border border-white/10 hover:bg-white/20 transition-all"
              onClick={() => setIsOpen(false)}
            >
               Explore
            </Link>

            <form onSubmit={handleSearch} className="flex w-4/5 px-2 space-x-2">
              <input
                type="text"
                placeholder="Search..."
                className="flex-1 px-4 py-2 rounded-full bg-white/15 text-white placeholder-white/70 
                           outline-none border border-white/20 backdrop-blur-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-full bg-white/20 hover:bg-white/30 text-white 
                           backdrop-blur-sm border border-white/20 transition-all"
                onClick={() => setIsOpen(false)}
              >
                🔍
              </button>
            </form>

            {!isAuthenticated ? (
              <>
                <Link 
                  to="/login" 
                  className="text-white/90 hover:text-white px-6 py-3 rounded-full w-4/5 text-center
                             backdrop-blur-sm bg-white/10 border border-white/10 hover:bg-white/20 transition-all"
                  onClick={() => setIsOpen(false)}
                >
                   Login
                </Link>
                <Link 
                  to="/signup" 
                  className="text-white px-6 py-3 rounded-full w-4/5 text-center
                             bg-gradient-to-r from-indigo-500/90 to-pink-500/90 
                             hover:from-indigo-600 hover:to-pink-600 border border-white/20 
                             backdrop-blur-sm transition-all"
                  onClick={() => setIsOpen(false)}
                >
                   Sign Up
                </Link>
              </>
            ) : (
              <>
                <div className="px-6 py-3 text-center border-t border-white/10 w-full">
                  <p className="text-white/70 text-sm">Signed in as</p>
                  <p className="text-white font-medium">{auth.username}</p>
                </div>
                <Link 
                  to="/profile" 
                  className="text-white/90 hover:text-white px-6 py-3 rounded-full w-4/5 text-center
                             backdrop-blur-sm bg-white/10 border border-white/10 hover:bg-white/20 transition-all"
                  onClick={() => setIsOpen(false)}
                >
                   Profile
                </Link>
                <button 
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }} 
                  className="text-red-200 hover:text-red-100 px-6 py-3 rounded-full w-4/5 text-center
                             backdrop-blur-sm bg-red-500/20 border border-red-300/20 hover:bg-red-500/30 transition-all"
                >
                   Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;






















