module.exports = (app) => {
    const authController = require('../controllers/authControllers');
  
    var router = require("express").Router();
 
    router.post("/register", authController.insertUser);
    router.post("/login", authController.loginUser);
    router.post("/changePassword", authController.changePassword);
    app.use("/api/authSystem", router);
};
