import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom";
import {
  Calendar,
  LogOut,
  Menu,
  Package,
  ShoppingCart,
  UserCircle,
  X,
} from "lucide-react";
import toast from "react-hot-toast";

const Navbar = () => {

  const {
    navigate,
    user,
    setUser,
    axios,
    cartCount,
  } = useContext(AppContext);

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

            <Link
              to={"/"}
              className="text-gray-700 hover:text-orange-500 transition-colors duration-300 font-medium"
            >
              Home
            </Link>

            <Link
              to={"/menu"}
              className="text-gray-700 hover:text-orange-500 transition-colors duration-300 font-medium"
            >
              Menus
            </Link>

            <Link
              to={"/book-table"}
              className="text-gray-700 hover:text-orange-500 transition-colors duration-300 font-medium"
            >
              Book Table
            </Link>

            <Link
              to={"/contact"}
              className="text-gray-700 hover:text-orange-500 transition-colors duration-300 font-medium"
            >
              Contact
            </Link>

          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">

            {/* Cart */}
            <button
              onClick={() => navigate("/cart")}
              className="relative p-2 rounded-full hover:bg-gray-800 transition duration-300"
            >

              <ShoppingCart
                size={24}
                className="text-gray-700"
              />

              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount > 0 ? cartCount : 0}
              </span>

            </button>

            {/* Profile */}
            <div className="hidden md:block">

              {user ? (

                <div className="relative">

                  <button
                    onMouseEnter={() => setIsProfileOpen(true)}
                    onMouseLeave={() => setIsProfileOpen(false)}
                    className="p-2 rounded-full hover:bg-gray-800 transition duration-300"
                  >

                    <UserCircle
                      size={32}
                      className="text-gray-700"
                    />

                  </button>

                  {isProfileOpen && (

                    <div
                      onMouseEnter={() => setIsProfileOpen(true)}
                      onMouseLeave={() => setIsProfileOpen(false)}
                      className="absolute right-0 mt-2 w-52 bg-white border border-gray-200 rounded-2xl shadow-2xl py-3"
                    >

                      <Link
                        to={"/my-bookings"}
                        className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-800 transition"
                      >

                        <Calendar
                          size={18}
                          className="mr-3"
                        />

                        My Bookings

                      </Link>

                      <Link
                        to={"/my-orders"}
                        className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-800 transition"
                      >

                        <Package
                          size={18}
                          className="mr-3"
                        />

                        My Orders

                      </Link>

                      <button
                        onClick={logout}
                        className="flex items-center w-full px-4 py-3 text-red-400 hover:bg-gray-800 transition"
                      >

                        <LogOut
                          size={18}
                          className="mr-3"
                        />

                        Logout

                      </button>

                    </div>

                  )}

                </div>

              ) : (

                <button
                  onClick={() => navigate("/login")}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-semibold transition duration-300 shadow-lg"
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
              Menus
            </Link>

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
                className="flex items-center text-red-400"
              >

                <LogOut
                  size={18}
                  className="mr-2"
                />

                Logout

              </button>

            ) : (

              <button
                onClick={() => navigate("/login")}
                className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-full"
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