module.exports = (app) => {
    const authController = require('../controllers/authControllers');
  
    var router = require("express").Router();
 
    router.get("/getAllData", authController.getAllData);
    app.use("/api/authSystem", router);
};
