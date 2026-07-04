import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { CircleX } from "lucide-react";
import toast from "react-hot-toast";

const Categories = () => {
  const {
    categories,
    fetchCategories,
    axios,
    categoryPage,
    categoryTotalPages,
  } = useContext(AppContext);

  const deleteCategory = async (id) => {
    try {
      const { data } = await axios.delete(`/api/category/delete/${id}`);

      if (data.success) {
        toast.success(data.message);

        fetchCategories(categoryPage);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="py-4">
      <h1 className="text-3xl font-bold mb-6 text-center">
        All Categories
      </h1>

      <div className="border rounded-xl shadow bg-white max-w-5xl mx-auto p-5">

        <div className="grid grid-cols-3 font-semibold border-b pb-3 mb-4">
          <div>Image</div>
          <div>Name</div>
          <div className="text-center">Action</div>
        </div>

        {categories.map((item) => (
          <div key={item._id}>
            <div className="grid grid-cols-3 items-center py-4">

              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-lg"
              />

              <p className="font-medium">{item.name}</p>

              <button
                onClick={() => deleteCategory(item._id)}
                className="flex justify-center text-red-500 hover:text-red-700"
              >
                <CircleX size={26} />
              </button>
            </div>

            <hr />
          </div>
        ))}

        <div className="flex justify-center items-center gap-4 mt-8">

          <button
            disabled={categoryPage === 1}
            onClick={() => fetchCategories(categoryPage - 1)}
            className="px-5 py-2 bg-orange-500 text-white rounded-lg disabled:opacity-50 cursor-pointer"
          >
            Prev
          </button>

          <span className="font-semibold">
            {categoryPage} / {categoryTotalPages}
          </span>

          <button
            disabled={categoryPage === categoryTotalPages}
            onClick={() => fetchCategories(categoryPage + 1)}
            className="px-5 py-2 bg-orange-500 text-white rounded-lg disabled:opacity-50 cursor-pointer"
          >
            Next
          </button>

        </div>
      </div>
    </div>
  );
};

export default Categories;