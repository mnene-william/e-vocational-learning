import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();


  const token = localStorage.getItem("ACCESS_TOKEN");
  const isAuthenticated = !!token;

  const handleLogout = () => {
    localStorage.removeItem("ACCESS_TOKEN");
    navigate("/login"); 
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
              <Link
                to="/login"
                className="text-white hover:text-pink-400 transition"
              >

                Login
              </Link>

              <Link
                to="/signup"
                className="text-white hover:text-pink-400 transition"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <button
                onClick={handleLogout}
                className="text-white hover:text-red-400 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>

        
        <div className="flex items-center gap-4">
         
          <div className="hidden md:flex items-center bg-white/20 rounded-full px-3 py-1">

            <input
              type="text"
              placeholder="Search skills..."
              className="bg-transparent outline-none text-sm text-white placeholder-white/70"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5 text-white/80 ml-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
              />
            </svg>
          </div>

         
          <button
            className="text-white md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-7 h-7"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-7 h-7"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

          
          {isAuthenticated && (
            <button className="w-9 h-9 rounded-full flex items-center justify-center bg-gradient-to-r from-indigo-400 to-pink-500 shadow-md hover:scale-105 transition">
                
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="white"
                viewBox="0 0 24 24"
                className="w-6 h-6"
              >
                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
              </svg>
            </button>
          )}
        </div>
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
              <button
                onClick={handleLogout}
                className="text-white hover:text-red-400 transition"
              >
                Logout
              </button>

            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;







