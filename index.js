const express = require('express')
const cors = require('cors')
const app = express()
const router = require('./router')
const crypto = require('crypto');
const cookieParser = require('cookie-parser')
require('dotenv').config()
app.use(express.json())
app.use(cors())
const dbConfig = require('./dbconfig')
app.use(cookieParser())
dbConfig()

app.use(router)


app.listen(8000, () => {
  console.log('Server is running')
})
