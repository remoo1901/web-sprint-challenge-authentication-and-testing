

const server = require('./api/server.js');

const PORT = process.env.PORT || 3300;
server.listen(PORT, () => {
  console.log(`\n=== Server listening on port ${PORT} ===\n`);
});





/* const express = require("express")
const helmet = require("helmet")
const cors = require("cors")

const cookieParser = require("cookie-parser")
const userAuth = require("./auth/auth-router")

const server = express()
const port = process.env.PORT || 5000

server.use(helmet())
server.use(cors())
server.use(express.json())
server.use(cookieParser())


 */