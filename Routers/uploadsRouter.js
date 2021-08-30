//external imports
const express = require("express");
const { getUploads, proPicUpload, deleteProPic  } = require("../Controllers/uploadsController");
const router = express.Router();

//internal import
const upload = require("../Middlewares/uploads");

//get page
router.get("/", getUploads);
router.post('/profilePic', upload.single('profilePics'), proPicUpload);
router.delete('/profilePic', deleteProPic)


module.exports = router;