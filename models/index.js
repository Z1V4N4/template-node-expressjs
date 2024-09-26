const dbConf = require("../configs/db.js");

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(dbConf.DB, dbConf.USER, dbConf.PASSWORD, {
    host: dbConf.HOST,
    dialect: dbConf.dialect,
    pool: {
        max: dbConf.pool.max,
        min: dbConf.pool.min,
        acquire: dbConf.pool.acquire,
        idle: dbConf.pool.idle
    },
    dialectOptions: {},
    timezone: dbConf.timezone
});

const db = {};

db.Sequelize = DataTypes;
db.sequelize = sequelize;

db.employeeExternalModel = require("./employeeExternalLogin.js")(sequelize, Sequelize);
db.employee = require("./employee.js")(sequelize, Sequelize);

module.exports = db;