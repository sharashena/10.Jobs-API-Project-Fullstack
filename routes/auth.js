const express = require("express");
const router = express.Router();
const authenticateUser = require("../middleware/authentication");
const { register, login, updateUser } = require("../controllers/auth");
const testUser = require("../middleware/testUser");
const rateLimiter = require("express-rate-limit");

const apiLimiter = rateLimiter({
  windowMs: 10 * 60 * 1000,
  max: 10,
  message: {
    msg: "Too many request from this IP, try after 10 minutes",
  },
});

router.post("/register", apiLimiter, register);
router.post("/login", apiLimiter, login);
router.patch("/updateUser", authenticateUser, testUser, updateUser);

module.exports = router;
