import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { ShoppingCart, Star, Plus, Minus } from "lucide-react";

const MenuCard = ({ menu }) => {
  const { navigate, addToCart, cart, removeFromCart } = useContext(AppContext);

  const cartItem = cart?.items?.find((item) => item.menuItem?._id === menu._id);

  return (
    <div className="bg-white rounded-[30px] overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 group border border-orange-100 flex flex-col h-full">
      <div
        onClick={() => navigate(`/menu-details/${menu._id}`)}
        className="relative h-64 overflow-hidden cursor-pointer"
      >
        <img
          src={menu.image}
          alt={menu.name}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>

        <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full flex items-center gap-1">
          <Star size={16} className="text-orange-500 fill-orange-500" />

          <span>{menu.rating}</span>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <p className="text-orange-500 text-sm font-semibold uppercase mb-2">
          {menu.category?.name}
        </p>

        <h3 className="text-2xl font-bold text-gray-900 mb-3 line-clamp-2 min-h-[65px]">
          {menu.name}
        </h3>

       <p className="text-gray-600 text-sm line-clamp-2 min-h-[45px]">{menu.description}</p>

     <div className="flex items-center justify-between mt-auto pt-6">
          <div>
            <p className="text-gray-500 text-sm">Starting From</p>

            <h2 className="text-3xl font-extrabold text-orange-500">
              ₹{menu.price}
            </h2>
          </div>

          {cartItem ? (
            <div className="flex items-center gap-3 bg-orange-500 text-white px-4 py-3 rounded-full">
              <button
                onClick={() => removeFromCart(menu._id)}
                className="cursor-pointer hover:scale-125 transition"
              >
                <Minus size={16} />
              </button>

              <span className="font-bold">{cartItem.quantity}</span>

              <button
                onClick={() => addToCart(menu._id)}
                className="cursor-pointer hover:scale-125 transition"
              >
                <Plus size={16} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => addToCart(menu._id)}
              className="flex items-center gap-2 px-5 py-3 rounded-full bg-orange-500 text-white shadow-lg cursor-pointer"
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
