import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Categories = () => {

  const { categories } = useContext(AppContext);

  return (
    <section className="py-24 bg-[#fffaf5]">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">

          <p className="uppercase tracking-[5px] text-orange-500 mb-4">
            Flavoro Categories
          </p>

          <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-5">

            Explore Our
            <span className="text-orange-500"> Categories</span>

          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Discover handcrafted dishes from our premium Indian menu.
          </p>

        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-10">

          {categories.map((cat) => (

            <div
              key={cat._id}
              className="group text-center cursor-pointer"
            >

              <div className="w-36 h-36 mx-auto rounded-full overflow-hidden shadow-lg border-4 border-white group-hover:border-orange-400 transition duration-300">

                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />

              </div>

              <h3 className="mt-5 text-lg font-semibold text-gray-800 group-hover:text-orange-500 transition">

                {cat.name}

              </h3>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
};

export default Categories;