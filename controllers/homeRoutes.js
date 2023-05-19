const router = require("express").Router();
const sequelize = require("../config/connection.js");
const { Post, User, Answer, Tag } = require("../models");
const withAuth = require("../utils/auth");

//Landing Page Route
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["name", "user_img"],
        },
      ],
      attributes: [
        "post_id",
        "post_title",
        "post_body",
        "date_created",
        "view_count",
        "user_id",
        "flag_count",
        [
          sequelize.literal(
            `(SELECT tag_name FROM tag WHERE tag_id = post.tag_id)`
          ),
          "tag_name",
        ],
        [
          sequelize.literal(
            `(SELECT COUNT(*) FROM answer WHERE answer.post_id = post.post_id)`
          ),
          "answer_count",
        ],
      ],
      order: [["view_count", "DESC"]],
      limit: 6,
    });

    const userCountData = await User.count();
    const postCountData = await Post.count();
    const answerCountData = await Answer.count();
    const posts = postData.map((post) => post.get({ plain: true }));

    res.render("homepage", {
      posts,
      logged_in: req.session.logged_in,
      session_name: req.session.name,
      session_user_id: req.session.user_id,
      user_count: userCountData,
      post_count: postCountData,
      answer_count: answerCountData,
    });
  } catch (err) {
    // console.log(err);
    // res.status(500).json({ message: "Internal Server Error" });
    res.render("error", {
      logged_in: req.session.logged_in,
    });
  }
});

// Questions Route
router.get("/questions", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["name", "user_img"],
        },
      ],
      attributes: [
        "post_id",
        "post_title",
        "post_body",
        "date_created",
        "view_count",
        "user_id",
        "tag_id",
        [
          sequelize.literal(
            `(SELECT tag_name FROM tag WHERE tag_id = post.tag_id)`
          ),
          "tag_name",
        ],
        [
          sequelize.literal(
            `(SELECT COUNT(*) FROM answer WHERE answer.post_id = post.post_id)`
          ),
          "answer_count",
        ],
        "flag_count",
      ],
      order: [["view_count", "DESC"]],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    // res.status(200).json(posts);
    res.render("questions", {
      posts,
      logged_in: req.session.logged_in,
      session_name: req.session.name,
      session_user_id: req.session.user_id,
    });
  } catch (err) {
    // console.log(err);
    // res.status(500).json({ message: "Internal Server Error" });
    res.render("error", {
      logged_in: req.session.logged_in,
    });
  }
});

router.get("/posts/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name", "user_img"],
        },
        {
          model: Answer,
          include: [
            {
              model: User,
              attributes: ["name", "user_img"],
            },
          ],
        },
      ],
    });

    // Increment the view_count field by 1
    postData.view_count += 1;
    await postData.save();

    const post = postData.get({ plain: true });
    // res.status(200).json(post)
    res.render("post", {
      post,
      logged_in: req.session.logged_in,
      name: req.session.name,
      user_id: req.session.user_id,
    });
  } catch (err) {
    // console.log(err);
    // res.status(500).json(err);
    // console.log(err);
    // res.status(500).json({ message: "Internal Server Error" });
    res.render("error", {
      logged_in: req.session.logged_in,
    });
  }
});

// Use withAuth middleware to prevent access to route
router.get("/profile", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      //req.session.user_id
      attributes: { exclude: ["password"] },
      include: [{ model: Post,
        attributes:[
          "post_id",
          "post_title",
          "post_body",
          "view_count",
          "flag_count",
          [
            sequelize.literal(
              `(SELECT tag_name FROM tag WHERE tag_id = posts.tag_id)`
            ),
            "tag_name",
          ],
          [
            sequelize.literal(
              `(SELECT COUNT(*) FROM answer WHERE answer.post_id = posts.post_id)`
            ),
            "answer_count",
          ],
        ], 
      },
    ],
    });

    const user = userData.get({ plain: true });

    // res.status(200).json(user);

    res.render("profile", {
      ...user,
      logged_in: req.session.logged_in,
      name: req.session.name,
      user_id: req.session.user_id,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }

  res.render("login");
});

router.get("/createPost", withAuth, async (req, res) => {
  try {
    const tags = await Tag.findAll({ raw: true });

    res.render("create_post", {
      tags,
      logged_in: req.session.logged_in,

      name: req.session.name,
      user_id: req.session.user_id,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/about", async (req, res) => {
  try {
    res.render("about", {
      logged_in: req.session.logged_in,
      name: req.session.name,
      user_id: req.session.user_id,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
