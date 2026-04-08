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
