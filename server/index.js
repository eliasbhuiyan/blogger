const express = require("express");
const cors = require("cors");
const app = express();
const router = require("./router");
const cookieParser = require("cookie-parser");
require("dotenv").config();
app.use(express.json());
console.log(process.env.CLIENT_URL);

app.use(cors(
  {
    origin: 'https://blogger-client-site.vercel.app',
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
    credentials: true // Set to true if your app uses cookies or auth tokens
  }
));
const dbConfig = require("./dbconfig");
app.use(cookieParser());
dbConfig();

app.use(router);

app.listen(8000, () => {
  console.log("Server is running");
});
