import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
} from "lucide-react";

export default function Footer() {

  return (
    <footer className="bg-[#1f2937] text-white">

      <div className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14">

          {/* Brand */}
          <div>

            <h1 className="text-4xl font-extrabold text-orange-400 mb-5">
              Flavoro
            </h1>

            <p className="text-gray-300 leading-relaxed">

              Experience authentic Indian flavors,
              premium dining, and unforgettable moments.

            </p>

            <div className="flex items-center gap-4 mt-8">

              <div className="bg-white/10 hover:bg-orange-500 transition p-3 rounded-full cursor-pointer">
                <Facebook size={20} />
              </div>

              <div className="bg-white/10 hover:bg-orange-500 transition p-3 rounded-full cursor-pointer">
                <Instagram size={20} />
              </div>

              <div className="bg-white/10 hover:bg-orange-500 transition p-3 rounded-full cursor-pointer">
                <Twitter size={20} />
              </div>

              <div className="bg-white/10 hover:bg-orange-500 transition p-3 rounded-full cursor-pointer">
                <Youtube size={20} />
              </div>

            </div>

          </div>

          {/* Quick Links */}
          <div>

            <h3 className="text-2xl font-semibold mb-6">
              Quick Links
            </h3>

            <ul className="space-y-4 text-gray-300">

              <li className="hover:text-orange-400 cursor-pointer">
                Home
              </li>

              <li className="hover:text-orange-400 cursor-pointer">
                Menus
              </li>

              <li className="hover:text-orange-400 cursor-pointer">
                Book Table
              </li>

              <li className="hover:text-orange-400 cursor-pointer">
                Contact
              </li>

            </ul>

          </div>

          {/* Opening Hours */}
          <div>

            <h3 className="text-2xl font-semibold mb-6">
              Opening Hours
            </h3>

            <ul className="space-y-4 text-gray-300">

              <li>
                Monday - Friday
                <br />
                11:00 AM - 11:00 PM
              </li>

              <li>
                Saturday - Sunday
                <br />
                10:00 AM - 12:00 AM
              </li>

            </ul>

          </div>

          {/* Contact */}
          <div>

            <h3 className="text-2xl font-semibold mb-6">
              Contact
            </h3>

            <div className="space-y-4 text-gray-300">

              <p>
                Park Street,
                Kolkata,
                India
              </p>

              <p>
                +91 98765 43210
              </p>

              <p>
                support@flavoro.com
              </p>

            </div>

          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-16 pt-8 text-center text-gray-400">

          © 2026 Flavoro Restaurant.
          All rights reserved.

        </div>

      </div>

    </footer>
  );

}