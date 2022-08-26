// Importing
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./config/dbconn');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

// Express App
const app = express();
app.use(express.static('views'))

// Set Header
app.use((req, res, next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Header", "*");
    next();
});
app.use(cors({
    origin: ['http://127.0.0.1:8000', 'http://localhost:8000'],
    credentials: true
}));

// Credentials
{
credentials: 'include'
}

// Configurations
const port = parseInt(process.env.PORT) || 4000;
app.use(cors(), express.json(), cookieParser(), bodyParser.urlencoded({ extended: true}));
app.listen(port, ()=> {console.log(`Server is running on port ${port}`)});

const productsRoute = require("./routes/productsRoute")
app.use("/products", productsRoute);

const usersRoute = require("./routes/usersRoute")
app.use("/users", usersRoute);