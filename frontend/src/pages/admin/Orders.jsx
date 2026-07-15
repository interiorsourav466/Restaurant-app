import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-hot-toast";

const Orders = () => {
  const { admin, axios, loading, setLoading } = useContext(AppContext);

  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/api/order/orders");

      if (data.success) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatusChange = async (orderId, status) => {
    try {
      setLoading(true);

      const { data } = await axios.put(`/api/order/update-status/${orderId}`, {
        status,
      });

      if (data.success) {
        toast.success(data.message);
        fetchOrders();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (admin) {
      fetchOrders();
    }
  }, []);

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-10">All Orders</h1>

      <div className="space-y-8">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white rounded-xl shadow border overflow-hidden"
          >
            {/* HEADER */}

            <div className="grid grid-cols-5 bg-orange-50 font-semibold text-gray-700 border-b">
              <div className="p-4">Customer</div>

              <div className="p-4">Address</div>

              <div className="p-4">Total</div>

              <div className="p-4">Payment</div>

              <div className="p-4">Status</div>
            </div>

            {/* ORDER INFO */}

            <div className="grid grid-cols-5 items-start">
              <div className="p-4 font-semibold">{order.user?.name}</div>

              <div className="p-4 text-sm leading-6 break-words">
                <p className="font-semibold">{order.address?.name}</p>

                <p>{order.address?.phone}</p>

                <p>{order.address?.street}</p>

                <p>
                  {order.address?.city}, {order.address?.state}
                </p>

                <p>{order.address?.pincode}</p>
              </div>

              <div className="p-4 font-semibold text-green-600">
                ₹ {order.totalAmount}
              </div>

              <div className="p-4">{order.paymentMethod}</div>

              <div className="p-4">
                <select
                  value={order.status}
                  disabled={loading}
                  onChange={(e) =>
                    handleStatusChange(order._id, e.target.value)
                  }
                  className="border rounded-lg px-3 py-2 w-full"
                >
                  <option>Pending</option>
                  <option>Preparing</option>
                  <option>Delivered</option>
                </select>
              </div>
            </div>

            {/* ITEMS */}

            <div className="border-t p-4">
              <div className="grid md:grid-cols-2 gap-4">
                {order.items
                  ?.filter((item) => item.menuItem)
                  .map((item) => (
                    <div
                      key={item._id}
                      className="flex gap-4 border rounded-lg p-3 bg-gray-50"
                    >
                      <img
                        src={
                          item.menuItem?.image ||
                          "https://via.placeholder.com/80"
                        }
                        alt={item.menuItem?.name}
                        className="w-20 h-20 rounded-lg object-cover"
                      />

                      <div>
                        <h3 className="font-semibold">{item.menuItem?.name}</h3>

                        <p className="text-gray-500">Qty : {item.quantity}</p>

                        <p className="text-orange-600 font-semibold">
                          ₹ {item.menuItem?.price}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
