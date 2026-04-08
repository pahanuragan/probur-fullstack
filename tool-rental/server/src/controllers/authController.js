const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../utils/prisma');
const { badRequest, isEmail, isPhone } = require('../utils/validation');

function createAuthResponse(user) {
  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
    },
  };
}

function serializeUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
  };
}

exports.register = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    const normalizedName = String(name || '').trim();
    const normalizedEmail = String(email || '').trim().toLowerCase();
    const normalizedPhone = String(phone || '').trim();

    if (!normalizedName || normalizedName.length < 2) {
      return badRequest(res, 'Name must contain at least 2 characters');
    }

    if (!isEmail(normalizedEmail)) {
      return badRequest(res, 'Please provide a valid email');
    }

    if (!isPhone(normalizedPhone)) {
      return badRequest(res, 'Please provide a valid phone number');
    }

    if (!password || String(password).length < 8) {
      return badRequest(res, 'Password must contain at least 8 characters');
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existingUser) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name: normalizedName,
        email: normalizedEmail,
        phone: normalizedPhone || null,
        password: hashedPassword,
      },
    });

    res.status(201).json(createAuthResponse(user));
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const normalizedEmail = String(email || '').trim().toLowerCase();

    if (!isEmail(normalizedEmail)) {
      return badRequest(res, 'Please provide a valid email');
    }

    if (!password || String(password).length < 8) {
      return badRequest(res, 'Password must contain at least 8 characters');
    }

    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.json(createAuthResponse(user));
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.me = async (req, res) => {
  try {
    res.json({ user: serializeUser(req.user) });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
