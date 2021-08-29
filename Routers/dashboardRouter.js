//external imports
const express = require("express");
const { getDashboard } = require("../Controllers/dashboardController");
const router = express.Router();

//get page
router.get("/", getDashboard);

module.exports = router;