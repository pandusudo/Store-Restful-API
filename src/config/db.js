const mysql = require('mysql')
const config = require('./configs')

const conn = mysql.createConnection(config.database.mysql)
conn.connect((err) => {
  if (err) console.log(err)
  console.log('connected to database')
})

module.exports = conn
