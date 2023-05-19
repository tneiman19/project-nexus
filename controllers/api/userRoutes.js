const router = require("express").Router();
const { User } = require("../../models");

// Handles user sign up
router.post("/", async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.user_id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Displays login page
router.get("/login", (req, res) => {
  try {
    res.render("login");
  } catch (err) {
    res.status(404).json(err);
  }
});

// Displays signup page
router.get("/signup", (req, res) => {
  try {
    res.render("signup");
  } catch (err) {
    res.status(404).json(err);
  }
});

// Handles login validation
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.user_id;
      req.session.name = userData.name;
      req.session.logged_in = true;

      console.log("You are now logged in!");
      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Deletes session
router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
