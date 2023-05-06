const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth");

router.get("/test", authController.test);
router.post("/user", authController.register);
router.post("/login", authController.login);

module.exports = router;
