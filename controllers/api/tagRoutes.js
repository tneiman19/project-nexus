const router = require("express").Router();
const sequelize = require("../../config/connection.js");
const { Tag, Post, Answer, User } = require("../../models");

// Display all tags
router.get("/", async (req, res) => {
  try {
    const tagsData = await Tag.findAll();

    const tags = tagsData.map((tag) => tag.get({ plain: true }));

    res.render("tags", {
      tags,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Display all posts for a specific tag
router.get("/:id", async (req, res) => {
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
        "tag_id",
        [
          sequelize.literal(
            `(SELECT tag_name FROM tag WHERE tag_id = ${req.params.id})`
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
          "user_id",
      ],
      where: {
        tag_id: req.params.id,
      },
    });

    const posts = postData.map((post) => post.get({ plain: true }));
    console.log("Session user id:", req.session)

    // res.status(200).json(posts);
    res.render("tagPosts", {
      posts,
      tagName: posts[0].tag_name,
      logged_in: req.session.logged_in,
      session_name: req.session.name,
      session_user_id: req.session.user_id,
    });
  } catch (err) {
    // res.status(400).json(err);
    res.render("error", {
      logged_in: req.session.logged_in,
    });
  }
});

module.exports = router;
