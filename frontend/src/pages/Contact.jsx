import React, { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (
      formData.name &&
      formData.email &&
      formData.subject &&
      formData.message
    ) {
      setSubmitted(true);

      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-[#fffaf5]">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Section */}
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-8">
              Contact Information
            </h2>

            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="bg-orange-500 p-3 rounded-xl shadow">
                  <MapPin className="w-5 h-5 text-white" />
                </div>

                <div>
                  <h3 className="font-semibold text-lg">Address</h3>
                  <p className="text-gray-600">
                    Saltlake, Kolkata
                    <br />
                    West Bengal, India
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="bg-orange-500 p-3 rounded-xl shadow">
                  <Phone className="w-5 h-5 text-white" />
                </div>

                <div>
                  <h3 className="font-semibold text-lg">Phone</h3>
                  <p className="text-gray-600">+91 7718625824</p>
                  <p className="text-gray-600">+91 9641665319</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="bg-orange-500 p-3 rounded-xl shadow">
                  <Mail className="w-5 h-5 text-white" />
                </div>

                <div>
                  <h3 className="font-semibold text-lg">Email</h3>
                  <p className="text-gray-600">
                    flavoro.restaurant@gmail.com
                  </p>
                  <p className="text-gray-600">bookings@flavoro.com</p>
                </div>
              </div>

              {/* Opening Hours */}
              <div className="flex items-start gap-4">
                <div className="bg-orange-500 p-3 rounded-xl shadow">
                  <Clock className="w-5 h-5 text-white" />
                </div>

                <div>
                  <h3 className="font-semibold text-lg">Opening Hours</h3>
                  <p className="text-gray-600">
                    Monday - Friday: 11:00 AM - 10:30 PM
                  </p>
                  <p className="text-gray-600">
                    Saturday - Sunday: 10:00 AM - 11:30 PM
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-2xl overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop"
                alt="Restaurant"
                className="w-full h-56 object-cover"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="bg-white border border-orange-100 rounded-2xl shadow-lg p-6 max-w-md w-full mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-5">
              Send Us A Message
            </h2>

            {submitted && (
              <div className="mb-4 bg-green-100 text-green-700 border border-green-300 rounded-lg px-4 py-2 text-sm">
                Thank you! Your message has been sent successfully.
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Name *
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full h-10 px-4 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Email *
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full h-10 px-4 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Phone
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 XXXXX XXXXX"
                  className="w-full h-10 px-4 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Subject *
                </label>

                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Reservation / Feedback"
                  className="w-full h-10 px-4 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Message *
                </label>

                <textarea
                  rows="4"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message..."
                  className="w-full px-4 py-2 border rounded-lg resize-none focus:ring-2 focus:ring-orange-500 outline-none"
                ></textarea>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full h-11 bg-orange-500 hover:bg-orange-600 text-white rounded-lg flex items-center justify-center gap-2 font-semibold transition cursor-pointer"
              >
                <Send size={18} />
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;