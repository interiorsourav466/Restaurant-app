import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";

const MyOrders = () => {
  const { axios } = useContext(AppContext);

  const [orders, setOrders] = useState([]);

  const fetchMyOrders = async () => {
    try {
      const { data } = await axios.get("/api/order/my-orders");

      if (data.success) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMyOrders();
  }, []);

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6">
      <h2 className="text-3xl font-bold mb-8 text-center">My Orders</h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-600">You have no orders yet</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white shadow-lg rounded-2xl p-6 border"
            >
              {/* TOP */}

              <div className="flex justify-between mb-5">
                <h3 className="font-bold">
                  Order ID :
                  <span className="text-orange-500 ml-2">
                    {order._id.slice(-6)}
                  </span>
                </h3>

                <span className="bg-yellow-100 text-yellow-700 px-4 py-1 rounded-full">
                  {order.status}
                </span>
              </div>

              {/* ITEMS */}

              <div className="space-y-3">
                {order.items
                  .filter((item) => item.menuItem)
                  .map((item) => (
                    <div
                      key={item._id}
                      className="flex items-center gap-4 border rounded-xl p-3"
                    >
                      <img
                        src={item.menuItem.image}
                        alt={item.menuItem.name}
                        className="w-20 h-20 rounded-xl object-cover"
                      />

                      <div className="flex-1">
                        <h3 className="font-bold">{item.menuItem.name}</h3>

                        <p>Qty : {item.quantity}</p>

                        <p className="text-orange-500 font-semibold">
                          ₹{item.menuItem.price}
                        </p>
                      </div>

                      <p className="font-bold">
                        ₹{item.menuItem.price * item.quantity}
                      </p>
                    </div>
                  ))}
              </div>

              {/* ADDRESS */}

              <div className="mt-5 bg-gray-50 p-4 rounded-xl">
                <h3 className="font-bold mb-2">Delivery Address</h3>

                <p>{order.address.name}</p>

                <p>{order.address.phone}</p>

                <p>
                  {order.address.street},{order.address.city}
                </p>

                <p>
                  {order.address.state} - {order.address.pincode}
                </p>
              </div>

              <div className="mt-5 flex justify-between">
                <p>Payment : {order.paymentMethod}</p>

                <h2 className="text-xl font-bold text-orange-500">
                  ₹{order.totalAmount}
                </h2>
              </div>

              <p className="text-sm text-gray-500 mt-3">
                Date : {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
