const prisma = require('../utils/prisma');

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

    if (!name || !name.trim()) {
      return res.status(400).json({ message: 'Name is required' });
    }

    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: {
        name: name.trim(),
        phone: phone?.trim() || null,
      },
    });

    res.json({ profile: serializeProfile(updatedUser) });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
