/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Search, X, Sparkles } from "lucide-react";
import MenuCard from "../components/MenuCard";

const Menu = () => {
  const { axios } = useContext(AppContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMenus, setFilteredMenus] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const fetchMenus = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(
        `/api/menu/all?search=${searchQuery}&page=${page}&limit=12`,
      );

      if (data.success) {
        setFilteredMenus(data.menuItems || []);

        setTotalPages(data.totalPages || 1);
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
  }, [searchQuery, page]);

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  return (
    <section className="min-h-screen bg-[#fffaf5] overflow-hidden">
      {/* Hero Section */}
      <div className="relative overflow-hidden py-28 px-6">
        {/* Background Blurs */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-orange-200/40 rounded-full blur-3xl"></div>

        <div className="absolute right-0 bottom-0 w-96 h-96 bg-orange-100 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-5 py-2 rounded-full font-semibold mb-6 shadow-sm">
              <Sparkles size={18} />
              Flavoro Premium Menu
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-gray-900 leading-tight mb-8">
              Explore Our
              <span className="block bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">
                Signature Dishes
              </span>
            </h1>

            {/* Description */}
            <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              Discover handcrafted Indian delicacies prepared with authentic
              spices, premium ingredients, and unforgettable flavors.
            </p>
          </div>

          {/* Search Box */}
          <div className="max-w-3xl mx-auto mb-14">
            <div className="relative bg-white rounded-full shadow-xl border border-orange-100 overflow-hidden">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-orange-400 w-6 h-6" />

              <input
                type="text"
                placeholder="Search for your favorite dishes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-16 pr-16 py-5 bg-transparent outline-none text-gray-800 placeholder-gray-400 text-lg"
              />

              {searchQuery && (
                <button
                  onClick={handleClearSearch}
                  className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-500 transition"
                >
                  <X className="w-6 h-6" />
                </button>
              )}
            </div>
          </div>

          {/* Results */}
          <div className="flex items-center justify-between flex-wrap gap-5 mb-14">
            {/* Left */}
            <div>
              {searchQuery ? (
                <div>
                  <p className="text-gray-500 text-sm mb-2 uppercase tracking-[3px]">
                    Search Results
                  </p>

                  <h2 className="text-3xl font-bold text-gray-900">
                    Found
                    <span className="text-orange-500">
                      {" "}
                      {filteredMenus.length}
                    </span>{" "}
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
                    <span className="text-orange-500">
                      {" "}
                      {filteredMenus.length}
                    </span>{" "}
                    Items
                  </h2>
                </div>
              )}
            </div>

            {/* Right Count Box */}
            <div className="bg-white border border-orange-100 rounded-3xl px-8 py-5 shadow-md">
              <p className="text-gray-500 text-sm">Flavoro Collection</p>

              <h3 className="text-4xl font-extrabold text-orange-500">
                {filteredMenus.length}
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

              <div className="flex justify-center gap-4 mt-14">
                <button
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                  className="px-5 py-2 bg-orange-500 text-white rounded disabled:opacity-50"
                >
                  Prev
                </button>

                <span className="font-semibold text-lg">
                  {page} / {totalPages}
                </span>

                <button
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
                  className="px-5 py-2 bg-orange-500 text-white rounded disabled:opacity-50"
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
