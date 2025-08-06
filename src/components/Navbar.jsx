import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  // Close user menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white shadow-md px-4 py-3 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex-shrink-0">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            QuizLogo
          </Link>
        </div>

        {/* Center: Menu (hidden on mobile) */}
        <div className="hidden md:flex space-x-8">
          <Link
            to="/"
            className="text-gray-700 hover:text-blue-600 font-medium"
          >
            Home
          </Link>
          <Link
            to="/quiz"
            className="text-gray-700 hover:text-blue-600 font-medium"
          >
            Quiz
          </Link>
        </div>

        {/* Right: User Section */}
        <div className="hidden md:flex items-center space-x-4 relative" ref={userMenuRef}>
          <button
            onClick={() => setIsUserMenuOpen((prev) => !prev)}
            className="flex items-center space-x-2 focus:outline-none"
            aria-haspopup="true"
            aria-expanded={isUserMenuOpen}
          >
            <span className="text-gray-700 font-medium cursor-pointer">John Doe</span>
            <img
              src="https://i.pravatar.cc/40"
              alt="User Avatar"
              className="w-8 h-8 rounded-full cursor-pointer"
            />
            <svg
              className={`w-4 h-4 text-gray-700 transform transition-transform duration-200 ${
                isUserMenuOpen ? "rotate-180" : "rotate-0"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {isUserMenuOpen && (
            <div className="absolute right-0 mt-10 w-40 bg-white border border-gray-200 rounded-md shadow-lg py-2 z-50">
              <Link
                to="/login"
                className="block px-4 py-2 text-gray-700 hover:bg-blue-100"
                onClick={() => setIsUserMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block px-4 py-2 text-gray-700 hover:bg-blue-100"
                onClick={() => setIsUserMenuOpen(false)}
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-700 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden mt-2 space-y-2 px-2">
          <Link
            to="/"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-100"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/quiz"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-100"
            onClick={() => setIsMenuOpen(false)}
          >
            Quiz
          </Link>

          {/* Mobile User Section */}
          <div className="border-t border-gray-200 pt-2 px-3">
            <button
              onClick={() => setIsUserMenuOpen((prev) => !prev)}
              className="flex items-center space-x-2 w-full focus:outline-none"
              aria-haspopup="true"
              aria-expanded={isUserMenuOpen}
            >
              <img
                src="https://i.pravatar.cc/40"
                alt="User Avatar"
                className="w-8 h-8 rounded-full"
              />
              <span className="text-gray-700 font-medium">John Doe</span>
              <svg
                className={`w-4 h-4 text-gray-700 transform transition-transform duration-200 ${
                  isUserMenuOpen ? "rotate-180" : "rotate-0"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isUserMenuOpen && (
              <div className="mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg py-2 z-50">
                <Link
                  to="/login"
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-100"
                  onClick={() => {
                    setIsUserMenuOpen(false);
                    setIsMenuOpen(false);
                  }}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-100"
                  onClick={() => {
                    setIsUserMenuOpen(false);
                    setIsMenuOpen(false);
                  }}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
