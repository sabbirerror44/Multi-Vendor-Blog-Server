//external imports
const express = require("express");
const { getUploads } = require("../Controllers/uploadsController");
const router = express.Router();

//get page
router.get("/", getUploads);

module.exports = router;