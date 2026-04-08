const prisma = require('../utils/prisma');

function serializeOrder(order) {
  return {
    id: order.id,
    userEmail: order.user.email,
    userName: order.user.name,
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

    if (!phone || !address || !rentDate || !Array.isArray(items) || !items.length) {
      return res.status(400).json({ message: 'Invalid order payload' });
    }

    const total = items.reduce((sum, item) => sum + Number(item.price || 0), 0);

    const order = await prisma.order.create({
      data: {
        userId: req.user.id,
        phone,
        address,
        rentDate,
        comment: comment || '',
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
