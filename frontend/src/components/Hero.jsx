import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Hero = () => {
  const { navigate } = useContext(AppContext);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1600&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/45"></div>

      <div className="relative z-10 text-center px-6 max-w-5xl">
       <p className="uppercase tracking-[5px] text-white mb-5 text-[30px] ">
          Welcome To Flavoro
        </p>

        <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6">
          Taste The
          <span className="block text-orange-400">Best Indian Food</span>
        </h1>

        <p className="text-gray-100 text-lg md:text-2xl max-w-3xl mx-auto mb-10">
          Discover authentic Indian flavors crafted with passion, tradition, and
          modern culinary excellence.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-5">
          <button
            onClick={() => navigate("/menu")}
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full font-semibold cursor-pointer"
          >
            Explore Menu
          </button>

          <button
            onClick={() => navigate("/book-table")}
            className="bg-white hover:bg-orange-50 text-gray-800 px-8 py-4 rounded-full font-semibold cursor-pointer"
          >
            Book Table
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
