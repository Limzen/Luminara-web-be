const express = require("express");
const router = express.Router();
const CommunityController = require("../controllers/ComunityController");
const upload = require("../middlewares/upload"); // multer middleware

router.get("/", CommunityController.index);

router.get("/:id", CommunityController.show);

router.post("/", upload.single("logo"), CommunityController.store);

router.put("/:id", upload.single("logo"), CommunityController.update);

router.delete("/:id", CommunityController.destroy);

module.exports = router;
