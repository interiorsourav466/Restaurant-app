import React, { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Categories = () => {
  const { categories, navigate } = useContext(AppContext);
  const [categoryLoading, setCategoryLoading] = useState(true);
  return (
    <section className="py-20 bg-[#fffaf5]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-14">
          <p className="uppercase tracking-[4px] text-orange-400 mb-3">
            Food Categories
          </p>

          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            Explore Categories
          </h2>

          <p className="text-gray-500 mt-5 max-w-2xl mx-auto">
            Choose from our delicious variety of Indian dishes prepared with
            authentic flavors and premium ingredients.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {categories?.map((category) => (
            <div
              key={category._id}
              onClick={() => navigate(`/menu?category=${category.name}`)}
              className="bg-white rounded-3xl shadow-md hover:shadow-xl transition duration-300 cursor-pointer p-5 text-center group"
            >
              {/* Image */}
              <div className="w-24 h-24 mx-auto overflow-hidden rounded-full mb-5 border-4 border-orange-100 group-hover:scale-105 transition">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    e.target.src =
                      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=300";
                  }}
                />
              </div>

              {/* Name */}
              <h3 className="text-lg font-bold text-gray-800 group-hover:text-orange-500 transition">
                {category.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default React.memo(Categories);
