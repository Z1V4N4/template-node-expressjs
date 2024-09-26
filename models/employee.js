module.exports = (sequelize, Sequelize) => {
  const employee = sequelize.define('EMPLOYEE', {
    LOGIN_ID: {
      type: Sequelize.STRING(20),
      allowNull: false,
      primaryKey: true,
    },
    NIK: {
      type: Sequelize.STRING(10),
      allowNull: false
    },
    FULL_NAME: {
      type: Sequelize.STRING(100),
      allowNull: true,
    },
  }, {
    schema: 'MUFIAM',
    tableName: 'EMPLOYEE',
    timestamps: false,
  });

  return employee;
};