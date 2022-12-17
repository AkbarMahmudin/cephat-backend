require('dotenv').config()

const {
  DBNAME,
  DBHOST,
  DBUSERNAME,
  DBPASSWORD,
  DBDIALECT,
  DBPORT
} = process.env

module.exports = {
  development: {
    username: DBUSERNAME,
    password: DBPASSWORD,
    database: DBNAME,
    host: DBHOST,
    dialect: DBDIALECT,
    dialectOptions: {
      connectTimeout: 20000
    },
    pool: {
      max: 5,
      min: 0,
      idle: 1 // Keep this very low or it'll make all Lambda requests take longer
    }
  },
  test: {
    username: DBUSERNAME,
    password: DBPASSWORD,
    database: DBNAME,
    host: DBHOST,
    dialect: DBDIALECT,
    dialectOptions: {
      connectTimeout: 20000
    },
    pool: {
      max: 5,
      min: 0,
      idle: 1 // Keep this very low or it'll make all Lambda requests take longer
    }
  },
  production: {
    username: DBUSERNAME,
    password: DBPASSWORD,
    database: DBNAME,
    host: DBHOST,
    port: DBPORT,
    dialect: DBDIALECT,
    dialectOptions: {
      connectTimeout: 20000
    },
    pool: {
      max: 5,
      min: 0,
      idle: 1 // Keep this very low or it'll make all Lambda requests take longer
    }
  }
}
