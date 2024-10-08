module.exports = (sequelize, Sequelize) => {
  const employeeExternalLogin = sequelize.define('EMPLOYEE_EXTERNAL_LOGIN', {
      LOGIN_ID: {
          type: Sequelize.STRING,
          allowNull: false,
          primaryKey: true,
        },
        DEFAULT_PASS: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        PASSWORD_SALT: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        PASSWORD_HASH: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        LOGIN_PASSWORD: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        ISACTIVE: {
          type: Sequelize.STRING(1),
          allowNull: false,
        },
        INSERT_DATE: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        UPDATE_DATE: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        UPDATE_BY: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        LAST_LOGIN_IP: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        LAST_LOGIN_APPL: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        COUNT_WRONG: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        ISLOCKED: {
          type: Sequelize.STRING(1),
          allowNull: false,
        },
      }, {
        scheme: 'MUFIAM',
        tableName: 'EMPLOYEE_EXTERNAL_LOGIN',
        timestamps: false,
      });

  return employeeExternalLogin;
};