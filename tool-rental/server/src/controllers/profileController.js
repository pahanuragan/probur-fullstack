const prisma = require('../utils/prisma');
const { badRequest, isPhone } = require('../utils/validation');

function serializeProfile(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    createdAt: user.createdAt,
  };
}

exports.getProfile = async (req, res) => {
  try {
    res.json({ profile: serializeProfile(req.user) });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, phone } = req.body;
    const normalizedName = String(name || '').trim();
    const normalizedPhone = String(phone || '').trim();

    if (!normalizedName || normalizedName.length < 2) {
      return badRequest(res, 'Name must contain at least 2 characters');
    }

    if (!isPhone(normalizedPhone)) {
      return badRequest(res, 'Please provide a valid phone number');
    }

    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: {
        name: normalizedName,
        phone: normalizedPhone || null,
      },
    });

    res.json({ profile: serializeProfile(updatedUser) });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
