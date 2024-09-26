const db = require('../models');
module.exports = {
    getAllData: async (req, res) => {
        try {
            // Check if username exists in the Employee table
            const employee = await db.employee.findAll();
            if (employee.length <= 0) {
              return res.status(404).json({ success: false, message: 'User Belum Terdaftar' });
            }
            return res.status(201).json({ success: true, message: 'User created successfully', employee_data: employee });
          } catch (error) {
            console.error(error);
            return res.status(500).json({ success: false, message: 'Internal server error' });
          }
    }
}