import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { ShoppingCart, Star } from "lucide-react";

const MenuCard = ({ menu }) => {
  const { navigate, addToCart } = useContext(AppContext);

  return (
    <div className="bg-white rounded-[30px] overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 group border border-orange-100">
      {/* Image */}
      <div
        onClick={() => navigate(`/menu-details/${menu._id}`)}
        className="relative h-64 overflow-hidden cursor-pointer"
      >
        <img
          src={menu.image}
          alt={menu.name}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>

        {/* Rating */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
          <Star size={16} className="text-orange-500 fill-orange-500" />

          <span className="text-sm font-semibold text-gray-800">
            {menu.rating}
          </span>
        </div>

        {/* Availability */}
        {!menu.isAvailable && (
          <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
            Unavailable
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Category */}
        <p className="text-orange-500 text-sm font-semibold uppercase tracking-wide mb-2">
          {menu.category?.name || "Chef's Choice"}
        </p>

        {/* Name */}
        <h3 className="text-2xl font-bold text-gray-900 mb-3 line-clamp-1">
          {menu.name}
        </h3>

        {/* Description */}
        <p className="text-gray-600 leading-relaxed text-sm line-clamp-2 min-h-[45px]">
          {menu.description}
        </p>

        {/* Bottom */}
        <div className="flex items-center justify-between mt-6">
          {/* Price */}
          <div>
            <p className="text-gray-500 text-sm">Starting From</p>

            <h2 className="text-3xl font-extrabold text-orange-500">
              ₹{menu.price}
            </h2>
          </div>

          {/* Button */}
          <button
            onClick={() => addToCart(menu._id)}
            disabled={!menu.isAvailable}
            className={`flex items-center gap-2 px-5 py-3 rounded-full font-semibold transition-all duration-300 ${
              menu.isAvailable
                ? "bg-orange-500 hover:bg-orange-600 text-white shadow-lg hover:scale-105 cursor-pointer"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            <ShoppingCart size={18} />
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
