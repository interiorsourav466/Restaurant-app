import Cart from "../models/cartModel.js";
import Menu from "../models/menuModel.js";
export const addToCart = async (req, res) => {
  try {
    const { menuId, quantity } = req.body;
    const { id } = req.user;
    const menuItem = await Menu.findById(menuId);
    if (!menuItem)
      return res.status(404).json({ message: "Menu item not found" });

    let cart = await Cart.findOne({ user: id });
    if (!cart) {
      cart = new Cart({ user: id, items: [] });
    }

    const existingItem = cart.items.find(
      (item) => item.menuItem.toString() === menuId,
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ menuItem: menuId, quantity });
    }

    await cart.save();
    res
      .status(200)
      .json({ message: "Item added to cart", success: true, cart });
  } catch (error) {
    console.log(error);
    return res.json({ message: "Internal server error", success: false });
  }
};

export const getCart = async (req, res) => {
  try {
    const { id } = req.user;

    let cart = await Cart.findOne({ user: id }).populate("items.menuItem");

    if (!cart) {
      return res.status(200).json({
        success: true,
        cart: { items: [] },
      });
    }

    // Remove deleted menu items
    cart.items = cart.items.filter((item) => item.menuItem !== null);

    await cart.save();

    res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { id } = req.user;
    const { menuId } = req.params;

    const cart = await Cart.findOne({ user: id });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    const existingItem = cart.items.find(
      (item) => item.menuItem.toString() === menuId,
    );

    if (!existingItem) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    // quantity greater than 1 decrease

    if (existingItem.quantity > 1) {
      existingItem.quantity -= 1;
    } else {
      // quantity 1 then remove

      cart.items = cart.items.filter(
        (item) => item.menuItem.toString() !== menuId,
      );
    }

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Cart updated successfully",
      cart,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
