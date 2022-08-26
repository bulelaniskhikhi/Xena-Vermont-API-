const mysql = require('mysql')

var con = mysql.createConnection({
    host : process.env.host,
    user : process.env.dbUser,
    password : process.env.dbPassword,
    database : process.env.database
})

module.exports = con 