const express = require("express");

const router = express.Router();

const {registerUser, loginUser, currentUser} = require("../controllers/userController");
const tokenValidate = require("../middleware/tokenValidate");

//Register
router.post("/register",registerUser)

//Login
router.post("/login",loginUser)

//current
router.get("/current", tokenValidate, currentUser)

module.exports = router;