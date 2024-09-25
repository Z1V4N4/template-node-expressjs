module.exports = {
    HOST: process.env.HOST_ORACLE,
    USER: process.env.USER_ORACLE,
    PASSWORD: process.env.PASSWORD_ORACLE,
    DB: process.env.DBNAME_ORACLE,
    dialect: process.env.DB_DIALECT,
    pool: {
        max: 20,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    timezone: process.env.TZ
};
