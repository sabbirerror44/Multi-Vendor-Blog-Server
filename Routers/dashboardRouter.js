//external imports
const express = require("express");
const { getDashboard, createProfile, editProfile } = require("../Controllers/dashboardController");
const router = express.Router();

//get page
router.get("/", getDashboard);
router.post('/create-profile', createProfile)
router.post('/edit-profile', editProfile)

module.exports = router;