module.exports = (app) => {
    const authController = require('../controllers/authControllers');
  
    var router = require("express").Router();
 
    router.post("/register", authController.register);
    router.post("/login", authController.login);
    router.post("/changePassword", authController.changePassword);
    app.use("/api/authSystem", router);
};
