import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-blue-600">
        RealEstate
      </Link>

      <div className="space-x-4 flex items-center">
        <Link to="/properties">Properties</Link>
        {(!user || user.role === 'buyer') && <Link to="/wishlist">Wishlist</Link>}
        {user ? (
          <>
            <Link to={`/dashboard/${user.role}`} className="text-blue-600">
              Dashboard ({user.role})
            </Link>
            <button onClick={logout} className="text-red-600">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-blue-600">Login</Link>
            <Link to="/register" className="bg-blue-600 text-white px-3 py-1 rounded">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
