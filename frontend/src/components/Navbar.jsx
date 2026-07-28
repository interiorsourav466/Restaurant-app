import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Link, NavLink } from "react-router-dom";
import {
  Calendar,
  LogOut,
  Menu,
  Package,
  ShoppingCart,
  X,
  User,
} from "lucide-react";
import toast from "react-hot-toast";

const Navbar = () => {
  const { navigate, user, setUser, axios, cartCount } = useContext(AppContext);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const logout = async () => {
    try {
      const { data } = await axios.post("/api/auth/logout");

      if (data.success) {
        setUser(null);

        localStorage.removeItem("admin");

        toast.success(data.message);

        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="bg-[#fffaf5]/95 backdrop-blur-md border-b border-orange-100 shadow-sm sticky top-0 z-50 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to={"/"}>
              <h1 className="text-3xl font-extrabold text-orange-400 tracking-wide">
                Flavoro
              </h1>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg font-medium transition-all duration-300 focus:outline-none ${
                  isActive
                    ? "bg-orange-100 text-orange-600"
                    : "text-gray-700 hover:bg-orange-50 hover:text-orange-500"
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/menu"
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg font-medium transition-all duration-300 focus:outline-none ${
                  isActive
                    ? "bg-orange-100 text-orange-600"
                    : "text-gray-700 hover:bg-orange-50 hover:text-orange-500"
                }`
              }
            >
              Menus
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-orange-100 text-orange-600"
                    : "text-gray-700 hover:bg-orange-50 hover:text-orange-500"
                }`
              }
            >
              About
            </NavLink>

            <NavLink
              to="/book-table"
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg font-medium transition-all duration-300 focus:outline-none ${
                  isActive
                    ? "bg-orange-100 text-orange-600"
                    : "text-gray-700 hover:bg-orange-50 hover:text-orange-500"
                }`
              }
            >
              Book Table
            </NavLink>

            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg font-medium transition-all duration-300 focus:outline-none ${
                  isActive
                    ? "bg-orange-100 text-orange-600"
                    : "text-gray-700 hover:bg-orange-50 hover:text-orange-500"
                }`
              }
            >
              Contact
            </NavLink>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <button
              onClick={() => navigate("/cart")}
              className="relative p-2 rounded-full bg-orange-100 hover:bg-orange-200 transition-all duration-300 cursor-pointer"
            >
              <ShoppingCart
                size={24}
                className="text-orange-600 hover:text-orange-700"
              />

              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center shadow">
                {cartCount > 0 ? cartCount : 0}
              </span>
            </button>

            {/* Profile */}
            <div className="hidden md:block">
              {user ? (
                <div
                  className="relative"
                  onMouseEnter={() => setIsProfileOpen(true)}
                  onMouseLeave={() => setIsProfileOpen(false)}
                >
                  <button className="p-1 rounded-full">
                    <img
                      src={
                        user?.profilePhoto ||
                        "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                      }
                      className=" w-10 h-10 rounded-full object-cover border-2 border-orange-500 cursor-pointer "
                    />
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 w-56 bg-white border border-orange-100 rounded-2xl shadow-xl py-2 overflow-hidden">
                      <Link
                        to="/profile"
                        className="flex items-center gap-3 px-5 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-all duration-200"
                      >
                        <User size={18} />

                        <span>My Profile</span>
                      </Link>
                      <Link
                        to="/my-bookings"
                        className="flex items-center gap-3 px-5 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-all duration-200"
                      >
                        <Calendar size={18} />
                        <span>My Bookings</span>
                      </Link>

                      <Link
                        to="/my-orders"
                        className="flex items-center gap-3 px-5 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-all duration-200"
                      >
                        <Package size={18} />
                        <span>My Orders</span>
                      </Link>

                      <button
                        onClick={logout}
                        className="flex items-center gap-3 w-full px-5 py-3 text-red-500 hover:bg-red-50 hover:text-red-600 transition-all duration-200 cursor-pointer"
                      >
                        <LogOut size={18} />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-semibold transition duration-300 shadow-lg cursor-pointer"
                >
                  Login
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-700"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-6 bg-[#1a1a1a] rounded-2xl border border-gray-800 p-5 space-y-5">
            <Link
              to={"/"}
              className="block text-gray-700 hover:text-orange-500"
            >
              Home
            </Link>

            <Link
              to={"/menu"}
              className="block text-gray-700 hover:text-orange-500"
            >
              <Link
                to="/about"
                className="block text-gray-700 hover:text-orange-500"
              >
                About
              </Link>
              Menus
            </Link>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-orange-100 text-orange-600"
                    : "text-gray-700 hover:bg-orange-50 hover:text-orange-500"
                }`
              }
            >
              About
            </NavLink>

            <Link
              to={"/book-table"}
              className="block text-gray-700 hover:text-orange-500"
            >
              Book Table
            </Link>

            <Link
              to={"/contact"}
              className="block text-gray-700 hover:text-orange-500"
            >
              Contact
            </Link>

            {user ? (
              <button
                onClick={logout}
                className="flex items-center text-red-400 cursor-pointer"
              >
                <LogOut size={18} className="mr-2" />
                Logout
              </button>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-full cursor-pointer"
              >
                Login
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
