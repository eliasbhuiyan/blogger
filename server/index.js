const express = require("express");
const cors = require("cors");
const app = express();
const router = require("./router");
const cookieParser = require("cookie-parser");
require("dotenv").config();

app.use(cors(
  {
    origin: 'https://blogger-client-site.vercel.app',
    credentials: true
  }
));

app.use(express.json());

const dbConfig = require("./dbconfig");
app.use(cookieParser());
dbConfig();

app.use(router);

app.listen(8000, () => {
  console.log("Server is running");
});
