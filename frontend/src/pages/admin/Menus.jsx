import { useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { CircleX } from "lucide-react";
import toast from "react-hot-toast";

const Menus = () => {
  const { menus, fetchMenus, axios, menuPage, setMenuPage, menuTotalPages } =
    useContext(AppContext);

  useEffect(() => {
    fetchMenus(menuPage);
  }, [menuPage]);

  const deleteMenu = async (id) => {
    try {
      const { data } = await axios.delete(`/api/menu/delete/${id}`);

      if (data.success) {
        toast.success(data.message);
        fetchMenus(menuPage);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="py-4">
      <h1 className="text-3xl font-bold mb-6">All Menus</h1>

      <div className="border border-gray-300 rounded-lg overflow-hidden">
        {/* Header */}

        <div className="grid grid-cols-5 bg-orange-50 p-4 font-semibold">
          <div>Image</div>
          <div>Name</div>
          <div>Category</div>
          <div>Price</div>
          <div className="text-center">Action</div>
        </div>

        {/* Rows */}

        {menus.map((item) => (
          <div
            key={item._id}
            className="grid grid-cols-5 items-center p-4 border-t"
          >
            <div>
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-lg"
              />
            </div>

            <div>{item.name}</div>

            <div>{item.category?.name}</div>

            <div>₹{item.price}</div>

            <div className="flex justify-center">
              <button
                onClick={() => deleteMenu(item._id)}
                className="text-red-500 hover:text-red-700 cursor-pointer"
              >
                <CircleX size={24} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}

      <div className="flex justify-center items-center gap-5 mt-8">
        <button
          disabled={menuPage === 1}
          onClick={() => setMenuPage((prev) => prev - 1)}
          className="px-5 py-2 bg-orange-500 text-white rounded-lg disabled:opacity-50 cursor-pointer"
        >
          Previous
        </button>

        <span className="font-semibold text-lg">
          {menuPage} / {menuTotalPages}
        </span>

        <button
          disabled={menuPage === menuTotalPages}
          onClick={() => setMenuPage((prev) => prev + 1)}
          className="px-5 py-2 bg-orange-500 text-white rounded-lg disabled:opacity-50 cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Menus;
