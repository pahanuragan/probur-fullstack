require('dotenv').config();
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const demoUser = {
  name: 'Demo User',
  email: 'demo@probur.dev',
  phone: '+7 (999) 123-45-67',
  password: 'DemoPass123',
};

const demoOrders = [
  {
    status: 'CONFIRMED',
    phone: demoUser.phone,
    address: 'Москва, ул. Лесная, 12',
    rentDate: '2026-04-15',
    comment: 'Нужна доставка в первой половине дня',
    items: [
      {
        title: 'Перфоратор Bosch GBH 2-26',
        category: 'Перфораторы',
        price: 1900,
        image: '/images/tools/perforator.jpg',
      },
      {
        title: 'Лазерный уровень Bosch GLL 2-10',
        category: 'Лазерные уровни',
        price: 1300,
        image: '/images/tools/drill.jpg',
      },
    ],
  },
  {
    status: 'COMPLETED',
    phone: demoUser.phone,
    address: 'Москва, ул. Маршала Бирюзова, 8',
    rentDate: '2026-04-02',
    comment: 'Самовывоз',
    items: [
      {
        title: 'Шуруповерт Makita DDF453',
        category: 'Шуруповерты',
        price: 1400,
        image: '/images/tools/drill.jpg',
      },
      {
        title: 'Пылесос строительный Karcher WD 3',
        category: 'Пылесосы',
        price: 1900,
        image: '/images/tools/sander.jpg',
      },
    ],
  },
];

const demoCart = [
  {
    title: 'Краскопульт Bosch PFS 3000-2',
    category: 'Краскопульты',
    price: 1750,
    image: '/images/tools/mixer.jpg',
  },
  {
    title: 'Плиткорез DIAM ML-720',
    category: 'Плиткорезы',
    price: 2100,
    image: '/images/tools/grinder.jpg',
  },
];

async function main() {
  const password = await bcrypt.hash(demoUser.password, 10);

  const user = await prisma.user.upsert({
    where: { email: demoUser.email },
    update: {
      name: demoUser.name,
      phone: demoUser.phone,
      password,
    },
    create: {
      name: demoUser.name,
      email: demoUser.email,
      phone: demoUser.phone,
      password,
    },
  });

  await prisma.orderItem.deleteMany({
    where: {
      order: {
        userId: user.id,
      },
    },
  });

  await prisma.order.deleteMany({
    where: { userId: user.id },
  });

  await prisma.cartItem.deleteMany({
    where: { userId: user.id },
  });

  for (const order of demoOrders) {
    const total = order.items.reduce((sum, item) => sum + item.price, 0);

    await prisma.order.create({
      data: {
        userId: user.id,
        status: order.status,
        phone: order.phone,
        address: order.address,
        rentDate: order.rentDate,
        comment: order.comment,
        total,
        items: {
          create: order.items,
        },
      },
    });
  }

  await prisma.cartItem.createMany({
    data: demoCart.map((item) => ({
      userId: user.id,
      title: item.title,
      category: item.category,
      price: item.price,
      image: item.image,
    })),
  });

  console.log('Demo data seeded successfully.');
  console.log(`Demo email: ${demoUser.email}`);
  console.log(`Demo password: ${demoUser.password}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
