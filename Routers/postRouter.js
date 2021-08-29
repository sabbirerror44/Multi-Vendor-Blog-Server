//external imports
const express = require("express");
const { getPost } = require("../Controllers/postController");
const router = express.Router();

//get page
router.get("/", getPost);

module.exports = router;