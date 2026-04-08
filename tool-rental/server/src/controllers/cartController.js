const prisma = require('../utils/prisma');

function serializeCartItem(item) {
  return {
    id: item.id,
    title: item.title,
    category: item.category,
    price: item.price,
    image: item.image,
  };
}

exports.getMyCart = async (req, res) => {
  try {
    const cartItems = await prisma.cartItem.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'asc' },
    });

    res.json({ cart: cartItems.map(serializeCartItem) });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.addCartItem = async (req, res) => {
  try {
    const { title, category, price, image } = req.body;

    if (!title || !category || !price || !image) {
      return res.status(400).json({ message: 'Invalid cart item payload' });
    }

    await prisma.cartItem.create({
      data: {
        userId: req.user.id,
        title,
        category,
        price: Number(price),
        image,
      },
    });

    const cartItems = await prisma.cartItem.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'asc' },
    });

    res.status(201).json({ cart: cartItems.map(serializeCartItem) });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.removeCartItem = async (req, res) => {
  try {
    const cartItemId = Number(req.params.id);

    const existingItem = await prisma.cartItem.findFirst({
      where: {
        id: cartItemId,
        userId: req.user.id,
      },
    });

    if (!existingItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    await prisma.cartItem.delete({
      where: { id: cartItemId },
    });

    const cartItems = await prisma.cartItem.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'asc' },
    });

    res.json({ cart: cartItems.map(serializeCartItem) });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
