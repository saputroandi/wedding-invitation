const dotenv = require('dotenv');
const path = require('path');
dotenv.config();

module.exports = {
  rootPath: path.resolve(__dirname, '..'),
  port: process.env.PORT,
  dbName: process.env.DB_NAME,
};
