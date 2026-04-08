const prisma = require('../utils/prisma');
const { badRequest, isPhone } = require('../utils/validation');

function serializeOrder(order) {
  return {
    id: order.id,
    userEmail: order.user.email,
    userName: order.user.name,
    status: order.status,
    phone: order.phone,
    address: order.address,
    rentDate: order.rentDate,
    comment: order.comment || '',
    total: order.total,
    dateCreated: order.createdAt.toLocaleDateString('ru-RU'),
    items: order.items.map((item) => ({
      id: item.id,
      title: item.title,
      category: item.category,
      price: item.price,
      image: item.image,
    })),
  };
}

exports.createOrder = async (req, res) => {
  try {
    const { phone, address, rentDate, comment, items } = req.body;
    const normalizedPhone = String(phone || '').trim();
    const normalizedAddress = String(address || '').trim();
    const normalizedRentDate = String(rentDate || '').trim();

    if (!isPhone(normalizedPhone)) {
      return badRequest(res, 'Please provide a valid phone number');
    }

    if (!normalizedAddress || normalizedAddress.length < 5) {
      return badRequest(res, 'Please provide a valid delivery address');
    }

    if (!normalizedRentDate) {
      return badRequest(res, 'Please choose a rent date');
    }

    if (!Array.isArray(items) || !items.length) {
      return badRequest(res, 'Cart is empty');
    }

    const hasInvalidItem = items.some(
      (item) =>
        !item ||
        !item.title ||
        !item.category ||
        !item.image ||
        Number(item.price) <= 0,
    );

    if (hasInvalidItem) {
      return badRequest(res, 'Order contains invalid items');
    }

    const total = items.reduce((sum, item) => sum + Number(item.price || 0), 0);

    const order = await prisma.order.create({
      data: {
        userId: req.user.id,
        phone: normalizedPhone,
        address: normalizedAddress,
        rentDate: normalizedRentDate,
        comment: String(comment || '').trim(),
        total,
        items: {
          create: items.map((item) => ({
            title: item.title,
            category: item.category,
            price: Number(item.price),
            image: item.image,
          })),
        },
      },
      include: {
        user: true,
        items: true,
      },
    });

    await prisma.cartItem.deleteMany({
      where: { userId: req.user.id },
    });

    res.status(201).json({ order: serializeOrder(order) });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getMyOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      where: { userId: req.user.id },
      include: {
        user: true,
        items: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.json({ orders: orders.map(serializeOrder) });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
