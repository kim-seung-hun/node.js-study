const Sequelize = require("sequelize");
const config = require("../config/config.js");

const sequelize = new Sequelize(
  config.dev.database,
  config.dev.username,
  config.dev.password,
  config.dev
);

const db = {};

db.sequelize = sequelize;

module.exports = db;
