const e = require("express");

module.exports = (sequelize, Sequelize) => {
    const employee = sequelize.define('employee', {
        LOGIN_ID: {
            type: Sequelize.STRING(20),
            allowNull: false,
            primaryKey: true,
          },
          NIK: {
            type: Sequelize.STRING(10),
            allowNull: false,
            unique: true,
          },
          FULL_NAME: {
            type: Sequelize.STRING(100),
            allowNull: true,
          },
          PARENT_NIK: {
            type: Sequelize.STRING(50),
            allowNull: true,
          },
          HP_NO: {
            type: Sequelize.STRING(50),
            allowNull: true,
          },
          EMAIL: {
            type: Sequelize.STRING(50),
            allowNull: true,
          },
          STATUS: {
            type: Sequelize.STRING(50),
            allowNull: true,
          },
          PORTFOLIO_CODE: {
            type: Sequelize.STRING(50),
            allowNull: true,
          },
          PORTFOLIO_DESC: {
            type: Sequelize.STRING(100),
            allowNull: true,
          },
          BRANCH_ORIGIN: {
            type: Sequelize.STRING(100),
            allowNull: true,
          },
          BIRTH_DATE: {
            type: Sequelize.DATE,
            allowNull: true,
          },
          JOINT_DATE: {
            type: Sequelize.DATE,
            allowNull: true,
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
            type: Sequelize.STRING(50),
            allowNull: true,
          },
          EMPLOYEE_TYPE: {
            type: Sequelize.INTEGER,
            allowNull: true,
          },
          EMPLOYEE_STATUS: {
            type: Sequelize.STRING(1),
            allowNull: true,
          },
          RESIGN_DATE: {
            type: Sequelize.DATE,
            allowNull: true,
          },
          INSERT_BY: {
            type: Sequelize.STRING(50),
            allowNull: true,
          },
          NIK_REFERENCE: {
            type: Sequelize.STRING(20),
            allowNull: true,
          },
        }, {
          tableName: 'EMPLOYEE',
          timestamps: false,
        });

    return employee;
};