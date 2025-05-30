import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-primary text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex space-x-6">
            <Link to="/dashboard" className="hover:underline font-medium">
              Dashboard
            </Link>
            <Link to="/blogs/new" className="hover:underline font-medium">
              Create Blog
            </Link>
            <Link to="/blogs" className="hover:underline font-medium">
              My Blogs
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <span className="text-sm font-medium">Hi, {user.username}</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-1.5 rounded-md transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-white text-blue-600 text-sm font-semibold px-4 py-1.5 rounded-md hover:bg-gray-100 transition"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
