import {
  DollarSign,
  ShoppingBag,
  Users,
  Utensils,
  CalendarCheck,
  TrendingUp,
} from "lucide-react";

const Dashboard = () => {

  const stats = [
    {
      title: "Total Revenue",
      value: "₹1,24,500",
      icon: <DollarSign size={28} />,
      color: "bg-orange-500",
    },
    {
      title: "Total Orders",
      value: "1,245",
      icon: <ShoppingBag size={28} />,
      color: "bg-green-500",
    },
    {
      title: "Total Customers",
      value: "856",
      icon: <Users size={28} />,
      color: "bg-blue-500",
    },
    {
      title: "Menu Items",
      value: "120",
      icon: <Utensils size={28} />,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="min-h-screen bg-[#fffaf5] p-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">

        <div>

          <h1 className="text-4xl font-extrabold text-gray-900">
            Admin Dashboard
          </h1>

          <p className="text-gray-600 mt-2">
            Welcome back to Flavoro Restaurant Admin Panel.
          </p>

        </div>

        <button className="mt-5 md:mt-0 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-2xl shadow-lg font-semibold transition">

          Generate Report

        </button>

      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">

        {stats.map((item, index) => (

          <div
            key={index}
            className="bg-white rounded-[28px] p-6 shadow-md hover:shadow-2xl transition duration-500 border border-orange-100"
          >

            <div className="flex items-center justify-between">

              <div>

                <p className="text-gray-500 text-sm mb-2">
                  {item.title}
                </p>

                <h2 className="text-3xl font-extrabold text-gray-900">
                  {item.value}
                </h2>

              </div>

              <div
                className={`${item.color} text-white p-4 rounded-2xl shadow-lg`}
              >

                {item.icon}

              </div>
 
            </div>

          </div>

        ))}

      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 gap-8">

        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-[30px] p-8 shadow-md border border-orange-100">

          <div className="flex items-center justify-between mb-8">

            <h2 className="text-2xl font-bold text-gray-900">
              Recent Orders
            </h2>

            <button className="text-orange-500 font-semibold hover:underline">
              View All
            </button>

          </div>

          <div className="space-y-6">

            {[1, 2, 3, 4].map((item) => (

              <div
                key={item}
                className="flex items-center justify-between bg-[#fffaf5] p-5 rounded-2xl"
              >

                <div className="flex items-center gap-4">

                  <div className="bg-orange-500 text-white p-3 rounded-xl">

                    <ShoppingBag size={22} />

                  </div>

                  <div>

                    <h3 className="font-bold text-gray-900">
                      Order #{1000 + item}
                    </h3>

                    <p className="text-gray-500 text-sm">
                      2x Butter Chicken • 1x Naan
                    </p>

                  </div>

                </div>

                <div className="text-right">

                  <h3 className="font-bold text-orange-500">
                    ₹850
                  </h3>

                  <p className="text-green-500 text-sm font-medium">
                    Delivered
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* Right Side */}
        <div className="space-y-8">

          {/* Reservations */}
          <div className="bg-white rounded-[30px] p-8 shadow-md border border-orange-100">

            <div className="flex items-center justify-between mb-6">

              <h2 className="text-2xl font-bold text-gray-900">
                Reservations
              </h2>

              <CalendarCheck
                size={28}
                className="text-orange-500"
              />

            </div>

            <div className="space-y-5">

              <div className="bg-[#fffaf5] p-4 rounded-2xl">

                <h3 className="font-bold text-gray-900">
                  Rahul Sharma
                </h3>

                <p className="text-gray-500 text-sm">
                  Table for 4 • 7:30 PM
                </p>

              </div>

              <div className="bg-[#fffaf5] p-4 rounded-2xl">

                <h3 className="font-bold text-gray-900">
                  Priya Das
                </h3>

                <p className="text-gray-500 text-sm">
                  Table for 2 • 9:00 PM
                </p>

              </div>

            </div>

          </div>

          {/* Analytics */}
          <div className="bg-white rounded-[30px] p-8 shadow-md border border-orange-100">

            <div className="flex items-center justify-between mb-6">

              <h2 className="text-2xl font-bold text-gray-900">
                Growth
              </h2>

              <TrendingUp
                size={28}
                className="text-green-500"
              />

            </div>

            <div className="space-y-5">

              <div>

                <div className="flex justify-between mb-2">

                  <p className="text-gray-600">
                    Sales Growth
                  </p>

                  <p className="font-bold text-gray-900">
                    78%
                  </p>

                </div>

                <div className="w-full bg-gray-200 rounded-full h-3">

                  <div className="bg-orange-500 h-3 rounded-full w-[78%]"></div>

                </div>

              </div>

              <div>

                <div className="flex justify-between mb-2">

                  <p className="text-gray-600">
                    Customer Satisfaction
                  </p>

                  <p className="font-bold text-gray-900">
                    92%
                  </p>

                </div>

                <div className="w-full bg-gray-200 rounded-full h-3">

                  <div className="bg-green-500 h-3 rounded-full w-[92%]"></div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );

};

export default Dashboard;