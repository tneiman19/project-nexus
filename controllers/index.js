const router = require("express").Router();

const apiRoutes = require("./api");
const homeRoutes = require("./homeRoutes");
// const profileRoutes = require('./profileRoutes');

router.use("/", homeRoutes);
// router.use('/', profileRoutes);
router.use("/api", apiRoutes);

// Fallback route for when a user attempts to visit routes that don't exist
router.get('*', (req, res) => {
    res.render('invalid-route', {
      logged_in: req.session.logged_in,
      name: req.session.name,
      user_id: req.session.user_id,
    },
    )
  });

module.exports = router;
