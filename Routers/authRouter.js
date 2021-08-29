//external imports
const express = require("express");
const { getAuth, postSignUp, login } = require("../Controllers/authController");
const router = express.Router();

//get page
router.get("/", getAuth);

router.post("/signup", postSignUp);
router.post("/login", login);


module.exports = router;