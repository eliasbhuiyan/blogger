const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const generateOTP = () => {
  return Math.floor(Math.random() * 9000);
};

const generateAccessToken = (_id, email, role) => {
  return jwt.sign(
    {
      _id,
      email,
      role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};
const generateRefreshToken = (_id, email, role) => {
  return jwt.sign(
    {
      _id,
      email,
      role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "10d" }
  );
};

const generateResetPasswordToken = () => {
  const resetPasswordToken = crypto.randomBytes(16).toString("hex");

  const hashedToken = crypto
    .createHash("sha256")
    .update(resetPasswordToken)
    .digest("hex");

  return { resetPasswordToken, hashedToken };
};

const generateBlogSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/\s+/g, "-");
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = { generateOTP, generateAccessToken, generateRefreshToken, generateResetPasswordToken, generateBlogSlug, verifyToken };