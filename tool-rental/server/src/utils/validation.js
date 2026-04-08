function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || '').trim());
}

function isPhone(value) {
  if (!value) {
    return true;
  }

  return /^[+\d\s\-()]{7,20}$/.test(String(value).trim());
}

function badRequest(res, message) {
  return res.status(400).json({ message });
}

module.exports = {
  isEmail,
  isPhone,
  badRequest,
};
