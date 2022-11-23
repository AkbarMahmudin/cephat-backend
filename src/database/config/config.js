require('dotenv').config()

const {
  DBNAME,
  DBHOST,
  DBUSERNAME,
  DBPASSWORD
} = process.env

module.exports = {
  development: {
    username: DBUSERNAME,
    password: DBPASSWORD,
    database: DBNAME,
    host: DBHOST,
    dialect: 'postgres'
  },
  test: {
    username: DBUSERNAME,
    password: DBPASSWORD,
    database: DBNAME,
    host: DBHOST,
    dialect: 'postgres'
  },
  production: {
    username: DBUSERNAME,
    password: DBPASSWORD,
    database: DBNAME,
    host: DBHOST,
    dialect: 'postgres'
  }
}
