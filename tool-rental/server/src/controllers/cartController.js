const prisma = require('../utils/prisma');
const { badRequest } = require('../utils/validation');

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
    const normalizedTitle = String(title || '').trim();
    const normalizedCategory = String(category || '').trim();
    const normalizedImage = String(image || '').trim();
    const normalizedPrice = Number(price);

    if (!normalizedTitle || !normalizedCategory || !normalizedImage || normalizedPrice <= 0) {
      return badRequest(res, 'Invalid cart item payload');
    }

    await prisma.cartItem.create({
      data: {
        userId: req.user.id,
        title: normalizedTitle,
        category: normalizedCategory,
        price: normalizedPrice,
        image: normalizedImage,
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

    if (!Number.isInteger(cartItemId) || cartItemId <= 0) {
      return badRequest(res, 'Invalid cart item id');
    }

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
