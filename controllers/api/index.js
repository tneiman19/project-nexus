const router = require("express").Router();
const userRoutes = require("./userRoutes");
const postRoutes = require("./postRoutes");
const answerRoutes = require("./answerRoutes");
const tagRoutes = require('./tagRoutes');

router.use('/tags', tagRoutes);
router.use("/users", userRoutes);
router.use("/posts", postRoutes);
router.use("/answers", answerRoutes);

module.exports = router;
