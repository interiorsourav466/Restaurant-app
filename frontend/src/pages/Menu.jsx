/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Search, X, Sparkles } from "lucide-react";
import MenuCard from "../components/MenuCard";
import { useSearchParams } from "react-router-dom";

const Menu = () => {
  const { axios } = useContext(AppContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMenus, setFilteredMenus] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || "";
  const special = searchParams.get("special") || "";
  const fetchMenus = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(
        `/api/menu/all?search=${searchQuery}&category=${category}&special=${special}&page=${page}&limit=12`
      );

      if (data.success) {
        setFilteredMenus(data.menuItems || []);

        setTotalPages(data.totalPages || 1);

        setTotalItems(data.totalMenus || 0);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchMenus();
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery, page, category]);
  const handleClearSearch = () => {
    setSearchQuery("");
  };

  return (
    <section className="min-h-screen bg-[#fffaf5] overflow-hidden">
      {/* Hero Section */}
      <div className="relative overflow-hidden pt-16 pb-10 px-6">
        {/* Background Blurs */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-orange-200/40 rounded-full blur-3xl"></div>

        <div className="absolute right-0 bottom-0 w-96 h-96 bg-orange-100 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Hero */}


          {/* Search Box */}
          <div className="max-w-3xl mx-auto mb-8">
            <div className="relative bg-white rounded-2xl border border-orange-100 shadow-lg">
              <Search
                className="absolute left-5 top-1/2 -translate-y-1/2 text-orange-500"
                size={22}
              />

              <input
                type="text"
                placeholder="Search your favourite food..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-4 pl-14 pr-14 rounded-2xl outline-none text-lg"
              />

              {searchQuery && (
                <button
                  onClick={handleClearSearch}
                  className="absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer"
                >
                  <X className="text-gray-500 hover:text-orange-500" />
                </button>
              )}
            </div>
          </div>

          {/* Results */}
          <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
            {/* Left */}
            <div>
              {searchQuery ? (
                <div>
                  <p className="text-gray-500 text-sm mb-2 uppercase tracking-[3px]">
                    Search Results
                  </p>

                  <h2 className="text-3xl font-bold text-gray-900">
                    Found
                    <span className="text-orange-500"> {totalItems}</span>{" "}
                    Results
                  </h2>
                </div>
              ) : (
                <div>
                  <p className="text-gray-500 text-sm mb-2 uppercase tracking-[3px]">
                    Available Dishes
                  </p>

                  <h2 className="text-3xl font-bold text-gray-900">
                    Total
                    <span className="text-orange-500"> {totalItems}</span> Items
                  </h2>
                </div>
              )}
            </div>

            {/* Right Count Box */}
            <div className="bg-white border border-orange-100 rounded-3xl px-8 py-5 shadow-md">
              <p className="text-gray-500 text-sm">Flavoro Collection</p>

              <h3 className="text-4xl font-extrabold text-orange-500">
                {totalItems}
              </h3>
            </div>
          </div>
          {/* Menu Grid */}

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-3xl shadow p-4 animate-pulse"
                >
                  <div className="h-52 bg-gray-200 rounded-2xl"></div>

                  <div className="h-6 bg-gray-200 rounded mt-4"></div>

                  <div className="h-4 bg-gray-200 rounded mt-2"></div>
                </div>
              ))}
            </div>
          ) : filteredMenus.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredMenus.map((menu) => (
                  <MenuCard menu={menu} key={menu._id} />
                ))}
              </div>

              {/* Pagination */}

              <div className="flex justify-center gap-4 mt-10">
                <button
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                  className="px-5 py-2 bg-orange-500 text-white rounded disabled:opacity-50 cursor-pointer"
                >
                  Prev
                </button>

                <span className="font-semibold text-lg">
                  {page} / {totalPages}
                </span>

                <button
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
                  className="px-5 py-2 bg-orange-500 text-white rounded disabled:opacity-50 cursor-pointer"
                >
                  Next
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-4xl font-bold text-gray-700 mb-4">
                No Dish Found
              </p>

              <p className="text-gray-500 mb-8">
                We couldn't find any dishes matching "{searchQuery}"
              </p>

              <button
                onClick={handleClearSearch}
                className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-full"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Menu;
