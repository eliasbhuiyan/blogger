const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false, // Use true for port 465, false for port 587
  auth: {
    user: "elias.cit.bd@gmail.com",
    pass: "jxiw lopl mlmz zorl",
  },
});

const sendMail = async (to, subject, secret, template, name) => {
  await transporter.sendMail({
    from: '"Blogger" <maddison53@ethereal.email>',
    to: to,
    subject: subject,
    html: template(secret, name),
  });
};

module.exports = sendMail;
