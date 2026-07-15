import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Checkout = () => {
  const { totalPrice, axios, navigate, cart, addToCart, removeFromCart, fetchCartData, } =
    useContext(AppContext);

  const [address, setAddress] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("Cash on delivery");

  const handleAddressChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckout = async () => {
  if (
    !address.name ||
    !address.phone ||
    !address.street ||
    !address.city ||
    !address.state ||
    !address.pincode
  ) {
    toast.error("Please fill complete delivery address");
    return;
  }

  try {
    const { data } = await axios.post("/api/order/place", {
      address,
      paymentMethod,
    });

    if (data.success) {
      toast.success(data.message);

      // Reset address form
      setAddress({
        name: "",
        phone: "",
        street: "",
        city: "",
        state: "",
        pincode: "",
      });

      // Refresh cart from backend (backend has already cleared it)
      await fetchCartData();

      // Go to orders page
      navigate("/my-orders");
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.log(error);
    toast.error(error.response?.data?.message || "Something went wrong");
  }
};

  return (
    <div className="max-w-6xl mx-auto my-12 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white shadow-xl rounded-3xl p-8">
        {/* ADDRESS */}
        <div>
          <h2 className="text-3xl font-bold mb-6">Delivery Address</h2>

          <div className="space-y-4">
            <input
              name="name"
              value={address.name}
              onChange={handleAddressChange}
              placeholder="Full Name"
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-500"
            />

            <input
              name="phone"
              value={address.phone}
              onChange={handleAddressChange}
              placeholder="Mobile Number"
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-500"
            />

            <textarea
              name="street"
              value={address.street}
              onChange={handleAddressChange}
              placeholder="House No, Street, Area"
              rows="3"
              className="w-full border rounded-xl px-4 py-3 resize-none outline-none focus:ring-2 focus:ring-orange-500"
            />

            <div className="grid grid-cols-2 gap-4">
              <input
                name="city"
                value={address.city}
                onChange={handleAddressChange}
                placeholder="City"
                className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-500"
              />

              <input
                name="state"
                value={address.state}
                onChange={handleAddressChange}
                placeholder="State"
                className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <input
              name="pincode"
              value={address.pincode}
              onChange={handleAddressChange}
              placeholder="Pincode"
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        {/* SUMMARY */}

        {/* SUMMARY */}

        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-6">Order Summary</h2>

            {/* CART ITEMS */}

            <div className="space-y-4 mb-6">
              {cart?.items
                ?.filter((item) => item.menuItem)
                .map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center gap-4 border rounded-2xl p-3"
                  >
                    <img
                      src={item.menuItem.image}
                      alt={item.menuItem.name}
                      className="w-20 h-20 rounded-xl object-cover"
                    />

                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800">
                        {item.menuItem.name}
                      </h3>

                      <p className="text-orange-500 font-semibold">
                        ₹{item.menuItem.price}
                      </p>

                      <div className="flex items-center gap-3 mt-2">
                        <button
                          onClick={() => removeFromCart(item.menuItem._id)}
                          className="w-8 h-8 bg-orange-500 text-white rounded-full cursor-pointer"
                        >
                          -
                        </button>

                        <span className="font-bold">{item.quantity}</span>

                        <button
                          onClick={() => addToCart(item.menuItem._id)}
                          className="w-8 h-8 bg-orange-500 text-white rounded-full cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="font-bold">
                      ₹{item.menuItem.price * item.quantity}
                    </div>
                  </div>
                ))}
            </div>

            {/* TOTAL */}

            <div className="bg-orange-50 border rounded-2xl p-5 mb-6">
              <div className="flex justify-between text-xl">
                <span>Total Amount</span>

                <span className="text-orange-500 font-bold">₹{totalPrice}</span>
              </div>
            </div>

            <h3 className="font-semibold text-lg mb-4">Payment Method</h3>

            <div className="space-y-4">
              <label className="flex gap-3">
                <input
                  type="radio"
                  value="Cash on delivery"
                  checked={paymentMethod === "Cash on delivery"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Cash on delivery
              </label>

              <label className="flex gap-3">
                <input
                  type="radio"
                  value="Online Payment"
                  checked={paymentMethod === "Online Payment"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Online Payment
              </label>
            </div>
          </div>

          <button
            onClick={handleCheckout}
            className="mt-8 bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-bold cursor-pointer"
          >
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
