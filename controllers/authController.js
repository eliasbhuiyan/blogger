const userSchema = require("../models/userSchema");
const sendMail = require("../services/mailSender");
const { verifymailTemplate } = require("../services/mailTemplates");
const responseHandler = require("../services/responseHandaler");
const { generateOTP } = require("../services/utils");

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
    
    sendMail(
      email,
      "Verify your email",
      OTP,
      verifymailTemplate,
      fullName
    );

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

        const user = await userSchema.findOne({ email, otp, otpExpiry: { $gt: Date.now() } });
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
}

module.exports = { register, verifyOTP };