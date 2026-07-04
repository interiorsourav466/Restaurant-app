import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

export const AppContext = createContext();

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
axios.defaults.withCredentials = true;

const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [categories, setCategories] = useState([]);
  const [menus, setMenus] = useState([]);
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [categoryLoading, setCategoryLoading] = useState(true);
  const [menuPage, setMenuPage] = useState(1);
  const [menuTotalPages, setMenuTotalPages] = useState(1);
  const [categoryPage, setCategoryPage] = useState(1);
  const [categoryTotalPages, setCategoryTotalPages] = useState(1);

 const fetchCategories = async (page = 1) => {
  try {
    setCategoryLoading(true);

    const { data } = await axios.get(
      `/api/category/all?page=${page}&limit=10`
    );

    if (data.success) {
      setCategories(data.categories);
      setCategoryPage(data.currentPage);
      setCategoryTotalPages(data.totalPages);
    }
  } catch (error) {
    console.log(error);
  } finally {
    setCategoryLoading(false);
  }
};

  useEffect(() => {
    if (cart?.items) {
      const total = cart.items.reduce((sum, item) => {
        if (!item.menuItem) return sum;

        return sum + item.menuItem.price * item.quantity;
      }, 0);

      setTotalPrice(total);
    }
  }, [cart]);

  const cartCount =
    cart?.items?.reduce((acc, item) => {
      if (!item.menuItem) return acc;

      return acc + item.quantity;
    }, 0) || 0;

  const addToCart = async (menuId) => {
    try {
      const { data } = await axios.post("/api/cart/add", {
        menuId,
        quantity: 1,
      });

      if (data.success) {
        toast.success(data.message);

        fetchCartData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);

      toast.error("Something went wrong");
    }
  };
  const fetchCartData = async () => {
    try {
      const { data } = await axios.get("/api/cart/get");

      if (data.success) {
        setCart(data.cart);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMenus = async (page = 1) => {
    try {
      const { data } = await axios.get(`/api/menu/all?page=${page}&limit=12`);

      if (data.success) {
        setMenus(data.menuItems);
        setMenuPage(data.currentPage);
        setMenuTotalPages(data.totalPages);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const isAuth = async () => {
    try {
      const { data } = await axios.get("/api/auth/is-auth");

      if (data.success) {
        setUser(data.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    isAuth();
    fetchCategories();
    fetchMenus();
    // fetchCartData();
  }, []);
  useEffect(() => {
    if (user) {
      fetchCartData();
    } else {
      setCart([]);
    }
  }, [user]);

  const value = {
    navigate,
    axios,
    loading,
    setLoading,
    user,
    setUser,
    admin,
    setAdmin,

    categories,
    fetchCategories,

    menus,
    fetchMenus,
    menuPage,
    setMenuPage,
    menuTotalPages,

    addToCart,
    cart,
    cartCount,
    totalPrice,
    fetchCartData,
    categoryLoading,
    categoryPage,
categoryTotalPages,
setCategoryPage,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
