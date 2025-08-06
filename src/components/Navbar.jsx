import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const userMenuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const syncAuth = () => {
      const loginStatus = localStorage.getItem("isLoggedIn") === "true";
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      setIsLoggedIn(loginStatus);
      setUserName(currentUser?.email?.split("@")[0] || "User");
    };

    syncAuth();
    window.addEventListener("storage", syncAuth);

    return () => window.removeEventListener("storage", syncAuth);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
    setIsLoggedIn(false);
    setIsUserMenuOpen(false);
    navigate("/");
    window.dispatchEvent(new Event("storage"));
  };

  const handleProtectedRoute = (e, path) => {
    e.preventDefault();
    if (!isLoggedIn) {
      toast.error("You must be logged in to access the quiz.");
      navigate("/login");
    } else {
      navigate(path);
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md px-4 py-3 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          QuizLogo
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">
            Home
          </Link>
          <a
            href="/quiz"
            onClick={(e) => handleProtectedRoute(e, "/quiz")}
            className="text-gray-700 hover:text-blue-600 font-medium"
          >
            Quiz
          </a>
        </div>

        {/* Desktop User Section */}
        <div className="hidden md:flex items-center space-x-4 relative" ref={userMenuRef}>
          <button
            onClick={() => setIsUserMenuOpen((prev) => !prev)}
            className="flex items-center space-x-2 focus:outline-none"
          >
            <span className="text-gray-700 font-medium cursor-pointer">
              {isLoggedIn ? userName : "Account"}
            </span>
            <img
              src="https://i.pravatar.cc/40"
              alt="Avatar"
              className="w-8 h-8 rounded-full cursor-pointer"
            />
            <svg
              className={`w-4 h-4 transform transition-transform ${
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
            <div className="absolute right-0 mt-10 w-40 bg-white border rounded-md shadow-lg py-2 z-50">
              {isLoggedIn ? (
                // <button
                //   onClick={handleLogout}
                //   className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-red-100"
                // >
                //   Logout
                // </button>

                <>
                <Link
                  to="/profile"
                  className="block px-3 py-2 text-gray-700 hover:bg-blue-100 rounded"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                <Link
                  
                  className="block px-3 py-2 text-gray-700 hover:bg-blue-100 rounded"
                  onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                >
                  Logout
                </Link>
              </>

              ) : (
                <>
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
                </>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700 focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-2 space-y-2 px-2">
          <Link
            to="/"
            className="block px-3 py-2 text-gray-700 hover:bg-blue-100 rounded"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <a
            href="/quiz"
            className="block px-3 py-2 text-gray-700 hover:bg-blue-100 rounded"
            onClick={(e) => handleProtectedRoute(e, "/quiz")}
          >
            Quiz
          </a>
          <div className="border-t border-gray-200 pt-2">
            {isLoggedIn ? (
              
              // <button
                // onClick={() => {
                //   handleLogout();
                //   setIsMenuOpen(false);
                // }}
              //   className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-red-100"
              // >
              //   Logout
              // </button>

              <>
                <Link
                  to="/profile"
                  className="block px-3 py-2 text-gray-700 hover:bg-blue-100 rounded"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/logout"
                  className="block px-3 py-2 text-gray-700 hover:bg-blue-100 rounded"
                  onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                >
                  Logout
                </Link>
              </>
              
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 text-gray-700 hover:bg-blue-100 rounded"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block px-3 py-2 text-gray-700 hover:bg-blue-100 rounded"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
