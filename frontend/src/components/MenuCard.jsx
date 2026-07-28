import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { ShoppingCart, Star, Plus, Minus, Eye } from "lucide-react";

const MenuCard = ({ menu }) => {
  const { navigate, addToCart, removeFromCart, cart } = useContext(AppContext);

  const cartItem = cart?.items?.find((item) => item.menuItem?._id === menu._id);

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-orange-100 flex flex-col h-[460px] group hover:-translate-y-2">
      {/* IMAGE */}

      <div
        onClick={() => navigate(`/menu-details/${menu._id}`)}
        className="relative h-52 overflow-hidden cursor-pointer"
      >
        <img
          src={menu.image}
          alt={menu.name}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

        {/* Rating */}

        <div className="absolute top-4 left-4 bg-white rounded-full px-3 py-1 flex items-center gap-1 shadow-lg">
          <Star size={15} className="fill-orange-500 text-orange-500" />

          <span className="text-sm font-semibold">{menu.rating}</span>
        </div>

        {/* Special */}

        {menu.isSpecial && (
          <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
            SPECIAL
          </div>
        )}
      </div>

      {/* BODY */}

      <div className="flex flex-col flex-1 p-5">
        <p className="text-orange-500 uppercase tracking-widest text-xs font-bold">
          {menu.category?.name}
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-2 line-clamp-2 min-h-[64px]">
          {menu.name}
        </h2>

        {/* PRICE */}

        <div className="flex items-center justify-between mt-4">
          <div>
            <p className="text-xs text-gray-400 uppercase">Price</p>

            <h3 className="text-3xl font-extrabold text-orange-500">
              ₹{menu.price}
            </h3>
          </div>

          <div className="text-right">
            <p className="text-xs text-gray-400 uppercase">Rating</p>

            <div className="flex items-center gap-1 justify-end">
              <Star size={16} className="fill-orange-500 text-orange-500" />

              <span className="font-semibold">{menu.rating}</span>
            </div>
          </div>
        </div>

        {/* BUTTONS */}

        <div className="mt-auto pt-6 flex gap-3">
          <button
            onClick={() => navigate(`/menu-details/${menu._id}`)}
            className="flex-1 h-11 rounded-xl border-2 border-orange-500 text-orange-500 hover:bg-orange-50 transition cursor-pointer flex justify-center items-center gap-2"
          >
            <Eye size={18} />
            View
          </button>

          {cartItem ? (
            <div className="flex-1 h-11 rounded-xl bg-orange-500 text-white flex items-center justify-between px-4">
              <button
                onClick={() => removeFromCart(menu._id)}
                className="cursor-pointer hover:scale-125 transition"
              >
                <Minus size={18} />
              </button>

              <span className="font-bold text-lg">{cartItem.quantity}</span>

              <button
                onClick={() => addToCart(menu._id)}
                className="cursor-pointer hover:scale-125 transition"
              >
                <Plus size={18} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => addToCart(menu._id)}
              className="flex-1 h-11 rounded-xl bg-orange-500 hover:bg-orange-600 text-white transition cursor-pointer flex justify-center items-center gap-2"
            >
              <ShoppingCart size={18} />
              Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
