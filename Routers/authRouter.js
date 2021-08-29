//external imports
const express = require("express");
const { getAuth } = require("../Controllers/authController");
const router = express.Router();

//get page
router.get("/", getAuth);

module.exports = router;