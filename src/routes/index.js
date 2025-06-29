const express = require("express");
const router = express.Router();

// Import route modules
const directoryRoutes = require("./directory.routes");
const guideRoutes = require("./guide.routes");
const articleRoutes = require("./article.routes");
const comunityRoutes = require("./comunity.routes");
const authRoutes = require("./auth.routes");
const profileRoutes = require("./profile.routes");

// Use route modules
router.use("/directories", directoryRoutes);
router.use("/guides", guideRoutes);
router.use("/articles", articleRoutes);
router.use("/comunities", comunityRoutes);
router.use("/auth", authRoutes);
router.use("/profile", profileRoutes);

module.exports = router;
