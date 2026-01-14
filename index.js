const express = require('express')
const cors = require('cors')
const app = express()
const router = require('./router')
require('dotenv').config()
app.use(express.json())
app.use(cors())
const dbConfig = require('./dbconfig')

dbConfig()

app.use(router)


app.listen(8000, () => {
  console.log('Server is running')
})
