const db = require('../models');
const bcrypt = require('bcrypt');
const moment = require('moment');

const EmployeeExternalLoginController = {
  // Insert user
  async insertUser(req, res) {
    try {
      const { username } = req.body;

      // Check if username exists in the Employee table
      const employee = await db.employee.findOne({ where: { NIK: username } });
      if (!employee) {
        return res.status(404).json({ success: false, message: 'User Belum Terdaftar' });
      }

      const fullNameInitial = employee.FULL_NAME.charAt(0).toUpperCase();
      const currentYear = new Date().getFullYear();
      const DEFAULT_PASS = `IAM_${currentYear}${fullNameInitial}`;

      // Generate PASSWORD_SALT
      const PASSWORD_SALT = bcrypt.genSaltSync();
      const LOGIN_PASSWORD = bcrypt.hashSync(`${DEFAULT_PASS}${PASSWORD_SALT}`, 10);

      const newUser = await db.employeeExternalModel.create({
        LOGIN_ID: username,
        DEFAULT_PASS,
        PASSWORD_SALT,
        LOGIN_PASSWORD,
        ISACTIVE: '1',
        INSERT_DATE: new Date(),
        UPDATE_DATE: new Date(),
        COUNT_WRONG: 0,
        ISLOCKED: '0',
      });

      return res.status(201).json({ success: true, message: 'User created successfully', user: newUser });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
  },

  // Login user
  async loginUser(req, res) {
    try {
      const { username, password, app_name, ip } = req.body;

      const user = await db.employeeExternalModel.findOne({ where: { LOGIN_ID: username } });
      if (!user) {
        return res.status(404).json({ success: false, message: 'User Belum Terdaftar' });
      }

      if (user.ISLOCKED === '1') {
        return res.status(403).json({ success: false, message: 'Akun Anda Terkunci, Silahkan Hubungi Team IT' });
      }

      if (user.ISACTIVE !== '1') {
        return res.status(403).json({ success: false, message: 'Akun User Sudah Dinonaktifkan' });
      }

      const PASSWORD_HASH = user.PASSWORD_HASH || user.DEFAULT_PASS;
      const isPasswordValid = bcrypt.compareSync(`${password}${user.PASSWORD_SALT}`, user.LOGIN_PASSWORD);

      if (!isPasswordValid) {
        await db.employeeExternalModel.increment('COUNT_WRONG', { where: { LOGIN_ID: username } });
        const updatedUser = await db.employeeExternalModel.findOne({ where: { LOGIN_ID: username } });
        if (updatedUser.COUNT_WRONG >= 5) {
          await db.employeeExternalModel.update({ ISLOCKED: '1' }, { where: { LOGIN_ID: username } });
        }
        return res.status(403).json({ success: false, message: 'Password Salah' });
      }

      // Check for password expiration
      const twoMonthsAgo = moment().subtract(2, 'months');
      if (moment(user.UPDATE_DATE).isBefore(twoMonthsAgo)) {
        return res.status(403).json({ success: false, message: 'Password Telah Kadaluarsa' });
      }

      await db.employeeExternalModel.update(
        {
          LAST_LOGIN_APPL: app_name,
          LAST_LOGIN_IP: ip,
          COUNT_WRONG: 0,
          UPDATE_DATE: new Date(),
        },
        { where: { LOGIN_ID: username } }
      );

      return res.status(200).json({ success: true, message: 'Login Berhasil' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
  },

  // Change password
  async changePassword(req, res) {
    try {
      const { username, oldPassword, newPassword } = req.body;

      const user = await db.employeeExternalModel.findOne({ where: { LOGIN_ID: username } });
      if (!user) {
        return res.status(404).json({ success: false, message: 'User Belum Terdaftar' });
      }

      const PASSWORD_HASH = user.PASSWORD_HASH || user.DEFAULT_PASS;
      const isOldPasswordValid = bcrypt.compareSync(`${oldPassword}${user.PASSWORD_SALT}`, user.LOGIN_PASSWORD);

      if (!isOldPasswordValid) {
        return res.status(403).json({ success: false, message: 'Password Salah' });
      }

      // Update password
      const newLOGIN_PASSWORD = bcrypt.hashSync(`${newPassword}${user.PASSWORD_SALT}`, 10);
      await db.employeeExternalModel.update(
        {
          PASSWORD_HASH: newPassword,
          LOGIN_PASSWORD: newLOGIN_PASSWORD,
          UPDATE_DATE: new Date(),
        },
        { where: { LOGIN_ID: username } }
      );

      return res.status(200).json({ success: true, message: 'Pergantian Password Berhasil' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
  },
};

module.exports = EmployeeExternalLoginController;
