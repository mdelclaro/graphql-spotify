const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth");

router.get("/login", authController.login);

router.get("/callback", authController.callback);

router.post("/refresh_token", authController.refresh);

module.exports = router;
