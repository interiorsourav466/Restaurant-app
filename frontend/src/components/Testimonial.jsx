import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Software Engineer",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    review:
      "Amazing food and premium ambience. Flavoro feels like a luxury dining experience.",
  },
  {
    name: "Priya Das",
    role: "Student",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    review:
      "Affordable pricing with outstanding taste. Their biryani is absolutely incredible.",
  },
  {
    name: "Amit Verma",
    role: "Business Owner",
    image: "https://randomuser.me/api/portraits/men/65.jpg",
    review:
      "One of the best restaurants in Kolkata. Great service and fast delivery.",
  },
];

export default function Testimonial() {

  return (
    <section className="py-24 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-20">

          <p className="uppercase tracking-[5px] text-orange-500 mb-4">
            Customer Reviews
          </p>

          <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6">

            What Our
            <span className="text-orange-500">
              Customers Say
            </span>

          </h2>

        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

          {testimonials.map((item, index) => (

            <div
              key={index}
              className="bg-[#fffaf5] p-10 rounded-[30px] shadow-md hover:shadow-2xl transition duration-500 border border-orange-100"
            >

              {/* Stars */}
              <div className="flex gap-1 mb-6">

                {[...Array(5)].map((_, i) => (

                  <Star
                    key={i}
                    size={18}
                    className="fill-orange-500 text-orange-500"
                  />

                ))}

              </div>

              {/* Review */}
              <p className="text-gray-600 leading-relaxed mb-8">

                "{item.review}"

              </p>

              {/* User */}
              <div className="flex items-center gap-4">

                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-full object-cover"
                />

                <div>

                  <h3 className="text-xl font-bold text-gray-900">
                    {item.name}
                  </h3>

                  <p className="text-gray-500">
                    {item.role}
                  </p>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );

} 