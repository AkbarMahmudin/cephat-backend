require('dotenv').config()

const {
  DBNAME,
  DBHOST,
  DBUSERNAME,
  DBPASSWORD,
  DBDIALECT
} = process.env

module.exports = {
  development: {
    username: DBUSERNAME,
    password: DBPASSWORD,
    database: DBNAME,
    host: DBHOST,
    dialect: DBDIALECT
  },
  test: {
    username: DBUSERNAME,
    password: DBPASSWORD,
    database: DBNAME,
    host: DBHOST,
    dialect: DBDIALECT
  },
  production: {
    username: DBUSERNAME,
    password: DBPASSWORD,
    database: DBNAME,
    host: DBHOST,
    dialect: DBDIALECT
  }
}
