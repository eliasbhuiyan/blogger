const mongoose = require("mongoose");

const dbConfig = () => {
  return mongoose
    .connect(process.env.BD_URL)
    .then(() => console.log("DB Connected!"));
};

module.exports = dbConfig;
