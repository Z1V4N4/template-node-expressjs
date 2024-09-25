module.exports = (sequelize, Sequelize) => {
    const employeeExternalLogin = sequelize.define('employeeExternalLogin', {
        LOGIN_ID: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        DEFAULT_PASS: {
            type: Sequelize.STRING
        },
        PASSWORD_SALT: {
            type: Sequelize.STRING
        },
        PASSWORD_HASH: {
            type: Sequelize.STRING
        },
        LOGIN_PASSWORD: {
            type: Sequelize.STRING
        },
        ISACTIVE: {
            type: Sequelize.STRING
        },
        INSERT_DATE: {
            type: Sequelize.TIME
        },
        UPDATE_DATE: {
            type: Sequelize.TIME
        },
        UPDATE_BY: {
            type: Sequelize.STRING
        },
        LAST_LOGIN_IP: {
            type: Sequelize.STRING
        },
        LAST_LOGIN_APPL: {
            type: Sequelize.STRING
        },
        COUNT_WRONG: {
            type: Sequelize.INTEGER
        },
        ISLOCKED: {
            type: Sequelize.STRING
        }
    },
    {
        tableName: 'EMPLOYEE_EXTERNAL_LOGIN',
        freezeTableName: true,
        timestamps: false
      });

    return employeeExternalLogin;
};