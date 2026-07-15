import Order from "../models/orderModel.js";
import Cart from "../models/cartModel.js";

// PLACE ORDER

export const placeOrder = async (req, res) => {
  try {
    const { id } = req.user;

    const { address, paymentMethod } = req.body;

    // Address validation

    if (
      !address ||
      !address.name ||
      !address.phone ||
      !address.street ||
      !address.city ||
      !address.state ||
      !address.pincode
    ) {
      return res.status(400).json({
        success: false,
        message: "Complete delivery address required",
      });
    }

    // find cart

    const cart = await Cart.findOne({
      user: id,
    }).populate("items.menuItem");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Your cart is empty",
      });
    }

    // calculate total

    const totalAmount = cart.items.reduce((sum, item) => {
      return sum + item.menuItem.price * item.quantity;
    }, 0);

    // create order

    const newOrder = await Order.create({
      user: id,

      items: cart.items.map((item) => ({
        menuItem: item.menuItem._id,

        quantity: item.quantity,
      })),

      totalAmount,

      address,

      paymentMethod,
    });

    // clear cart after order

    cart.items = [];

    await cart.save();

    return res.status(201).json({
      success: true,

      message: "Order placed successfully",

      order: newOrder,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// USER ORDERS

export const getUserOrders = async (req, res) => {
  try {
    const { id } = req.user;

    const orders = await Order.find({
      user: id,
    })
      .populate("items.menuItem")
      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// ADMIN ALL ORDERS

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()

      .populate("user")

      .populate("items.menuItem")

      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,

      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// UPDATE STATUS

export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;

    const { status } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,

        message: "Order not found",
      });
    }

    order.status = status;

    await order.save();

    res.json({
      success: true,

      message: "Order Status Updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};
