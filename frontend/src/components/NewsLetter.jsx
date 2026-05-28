export default function NewsLetter() {

  return (
    <section className="bg-[#fffaf5] py-24 px-6">

      <div className="max-w-6xl mx-auto">

        <div className="bg-gradient-to-r from-orange-500 to-orange-400 rounded-[40px] overflow-hidden shadow-2xl">

          <div className="grid md:grid-cols-2 items-center">

            {/* Left */}
            <div className="p-10 md:p-16 text-white">

              <p className="uppercase tracking-[4px] text-orange-100 mb-4">
                Flavoro Newsletter
              </p>

              <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">

                Get Exclusive
                <span className="block">
                  Food Offers
                </span>

              </h2>

              <p className="text-orange-100 text-lg leading-relaxed">

                Subscribe now and receive special discounts,
                delicious updates, and exclusive restaurant offers.

              </p>

            </div>

            {/* Right */}
            <div className="bg-white h-full p-10 md:p-16 flex items-center">

              <div className="w-full">

                <h3 className="text-3xl font-bold text-gray-900 mb-6">
                  Stay Updated
                </h3>

                <div className="space-y-5">

                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:border-orange-500"
                  />

                  <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 rounded-2xl transition duration-300">

                    Subscribe Now

                  </button>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );

}