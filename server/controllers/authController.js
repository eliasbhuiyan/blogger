const userSchema = require("../models/userSchema");
const sendMail = require("../services/mailSender");
const crypto = require("crypto");
const {
  verifymailTemplate,
  resetPasswordTemplate,
} = require("../services/mailTemplates");
const responseHandler = require("../services/responseHandaler");
const {
  generateOTP,
  generateAccessToken,
  generateRefreshToken,
  generateResetPasswordToken,
  verifyToken,
} = require("../services/utils");
const { uploadToCloudinary, deleteFromCloudinary } = require("../services/cloudinaryConfig");

const register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName)
      return responseHandler.error(res, "Full Name is required", 400);
    if (!email) return responseHandler.error(res, "Email is required", 400);
    if (!password)
      return responseHandler.error(res, "Password is required", 400);

    const existindUser = await userSchema.findOne({ email });
    if (existindUser)
      return responseHandler.error(res, "Email already registered", 400);

    const OTP = generateOTP();
    const user = new userSchema({
      fullName,
      email,
      password,
      otp: OTP,
      otpExpiry: Date.now() + 10 * 60 * 1000,
    });
    await user.save();

    sendMail(email, "Verify your email", OTP, verifymailTemplate, fullName);

    responseHandler.success(res, "User registered successfully");
  } catch (error) {
    console.log(error);
    responseHandler.error(res, "Internal Server Error");
  }
};

const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email) return responseHandler.error(res, "Email is required", 400);
    if (!otp) return responseHandler.error(res, "OTP is required", 400);

    const user = await userSchema.findOne({
      email,
      otp,
      otpExpiry: { $gt: Date.now() },
    });
    if (!user) return responseHandler.error(res, "Invalid or expired OTP", 400);
    user.isVerified = true;
    user.otp = null;
    user.otpExpiry = null;
    await user.save();
    responseHandler.success(res, "Email verified successfully");
  } catch (error) {
    console.log(error);
    responseHandler.error(res, "Internal Server Error");
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) return responseHandler.error(res, "Email is required", 400);
    if (!password)
      return responseHandler.error(res, "Password is required", 400);

    const user = await userSchema.findOne({ email });
    if (!user) return responseHandler.error(res, "Invalid Credentials", 400);
    if (!user.isVerified)
      return responseHandler.error(res, "Email not verified", 400);

    const isPasswordValid = await user.verifyPassword(password);

    if (!isPasswordValid)
      return responseHandler.error(res, "Invalid Credentials", 400);
    const accessToken = generateAccessToken(user._id, user.email, user.role);
    const refreshToken = generateRefreshToken(user._id, user.email, user.role);
    res
      .cookie("X-Acc_Tkn", accessToken, {
        httpOnly: true,
        secure: false,
      })
      .cookie("X-Ref_Tkn", refreshToken, {
        httpOnly: true,
        secure: false,
      });
    responseHandler.success(res, "Login successful");
  } catch (error) {
    responseHandler.error(res, "Internal Server Error");
  }
};

const forgatePassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return responseHandler.error(res, "Email is required", 400);
    const existingUser = await userSchema.findOne({ email });
    if (!existingUser)
      return responseHandler.error(res, "Email not registered", 400);
    const { resetPasswordToken, hashedToken } = generateResetPasswordToken();

    existingUser.resetPasswordToken = hashedToken;
    existingUser.resetPasswordExpiry = Date.now() + 10 * 60 * 1000;
    existingUser.save();
    const resetPassLink = `${process.env.CLIENT_URL}/reset-password?token=${resetPasswordToken}`;
    sendMail(
      email,
      "Reset Your Password",
      resetPassLink,
      resetPasswordTemplate,
      existingUser.fullName,
    );
    responseHandler.success(res, "Password reset link sent to your email");
  } catch (error) {
    responseHandler.error(res, "Internal Server Error");
  }
};

const resetPassword = async (req, res) => {
  try {
    const { newPassword } = req.body;
    const { token } = req.params;
    if (!newPassword)
      return responseHandler.error(res, "New Password is required", 400);
    if (!token) return responseHandler.error(res, "Invalid Request", 400);
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await userSchema.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpiry: { $gt: Date.now() },
    });
    if (!user)
      return responseHandler.error(res, "Invalid or expired token", 400);
    user.password = newPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpiry = null;
    await user.save();
    responseHandler.success(res, "Password reset successfully");
  } catch (error) {
    responseHandler.error(res, "Internal Server Error");
  }
};

const getUserProfile = async (req, res) => {
  try {
    const user = await userSchema
      .findById(req.user._id)
      .select("fullName email role avatar");
    responseHandler.success(res, "User profile fetched successfully", user);
  } catch (error) {
    responseHandler.error(res, "Internal Server Error");
  }
};

const updateProfile = async (req, res) => {
  try {
    const { fullName } = req.body;

    const user = await userSchema
      .findById(req.user._id)
      .select("fullName email role avatar");

    if (fullName) user.fullName = fullName;

    if (req.file) {
      deleteFromCloudinary(user.avatar);
      const image = await uploadToCloudinary(req.file.buffer);
      if (image?.secure_url) user.avatar = image.secure_url;
    }

    user.save()
    responseHandler.success(res, "Profile updated successfully", user);
  } catch (error) {
    responseHandler.error(res, "Internal Server Error");
  }
};

const refreshAccessToken = async (req, res) => {
  try {
    const refreshToken = req.cookies["X-Ref_Tkn"];
    if (!refreshToken) return responseHandler.error(res, "Unauthorized access", 401);
    const decoded = verifyToken(refreshToken);
    if (!decoded) return responseHandler.error(res, "Unauthorized access", 401);
    const accessToken = generateAccessToken(decoded._id, decoded.email, decoded.role);
    res.cookie("X-Acc_Tkn", accessToken, {
      httpOnly: true,
      secure: false,
    });
    responseHandler.success(res, "Access token refreshed successfully");
  } catch (error) {
    responseHandler.error(res, "Internal Server Error");
  }
}

module.exports = {
  register,
  verifyOTP,
  loginUser,
  forgatePassword,
  resetPassword,
  getUserProfile,
  updateProfile,
  refreshAccessToken
};
