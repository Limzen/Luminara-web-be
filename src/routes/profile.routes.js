const express = require("express");
const router = express.Router();
const authController = require("../controllers/UserController");
const upload = require("../middlewares/upload");

router.get("/:id", authController.profile);

router.put("/:id", authController.updateProfile);

router.post("/:id/photo", upload.single("photo"), authController.updatePhoto);

module.exports = router;
