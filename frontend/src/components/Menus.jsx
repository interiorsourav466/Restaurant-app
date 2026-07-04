import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import MenuCard from "./MenuCard";
import { Sparkles } from "lucide-react";


const Menus = () => {
   const { menus, navigate } = useContext(AppContext);

  return (
    <section className="relative py-28 bg-[#fffaf5] overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-orange-200/40 rounded-full blur-3xl"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-100 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-24">
          {/* Small Badge */}
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-5 py-2 rounded-full font-semibold mb-6 shadow-sm">
            <Sparkles size={18} />
            Flavoro Premium Collection
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-gray-900 leading-tight mb-8">
            Crafted With
            <span className="block bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">
              Passion & Taste
            </span>
          </h1>

          {/* Description */}
          <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Every dish at Flavoro is prepared using authentic Indian spices,
            fresh ingredients, and modern culinary artistry to create an
            unforgettable dining experience.
          </p>
        </div>

        {/* Featured Banner */}
        <div className="relative mb-20 rounded-[40px] overflow-hidden shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1600"
            alt="Flavoro Food"
            className="w-full h-[350px] md:h-[450px] object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent"></div>

          {/* Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-2xl px-8 md:px-16 text-white">
              <p className="uppercase tracking-[5px] text-orange-300 mb-4">
                Chef Recommended
              </p>

              <h2 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
                Experience The
                <span className="block text-orange-400">
                  True Taste Of India
                </span>
              </h2>

              <p className="text-gray-200 text-lg leading-relaxed mb-8">
                Explore signature dishes handcrafted with authentic flavors,
                premium ingredients, and unforgettable presentation.
              </p>

              <button
                onClick={() => navigate("/menu?special=true")}
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full font-semibold cursor-pointer"
              >
                Explore Specials
              </button>
            </div>
          </div>
        </div>

        {/* Menu Section Heading */}
        <div className="flex items-center justify-between mb-12 flex-wrap gap-5">
          <div>
            <p className="text-orange-500 uppercase tracking-[4px] mb-3 font-semibold">
              Signature Dishes
            </p>

            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
              Our Best Menus
            </h2>
          </div>

          {/* Menu Count */}
          <div className="bg-white border border-orange-100 px-6 py-4 rounded-2xl shadow-sm">
            <p className="text-gray-500 text-sm">Total Available Items</p>

            <h3 className="text-3xl font-extrabold text-orange-500">
              {menus.length}
            </h3>
          </div>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {menus.map((menu) => (
            <MenuCard key={menu._id} menu={menu} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Menus;
