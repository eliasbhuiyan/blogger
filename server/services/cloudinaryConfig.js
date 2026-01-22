const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "djscrr2gy",
  api_key: "776332758593124",
  api_secret: "7zDU_v72_tYpT0ojXy0Ogt8ebZI",
  secure: true, // Optional, use HTTPS
});

const uploadToCloudinary = (imageBuffer) => {
  const base64 = imageBuffer.toString("base64");
  const dataURI = `data:image/jpeg;base64,${base64}`;
  return cloudinary.uploader.upload(dataURI, {
    folder: "blogapp",
  });
};

deleteFromCloudinary = (image) => {
  const publicId = image.split("/").pop().split(".")[0];
  return cloudinary.uploader.destroy(`blogapp/${publicId}`);
};

module.exports = { uploadToCloudinary, deleteFromCloudinary };
