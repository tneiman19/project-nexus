const router = require("express").Router();
const Post = require("../../models/Post");
const withAuth = require("../../utils/auth");
//const withAuth = require("../../utils/auth");

// API route to add new posts
router.post("/", async (req, res) => {
  // add this once authentication is done ->  withAuth
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

//API route to delete specific Posts
router.delete("/:id", async (req, res) => {
  // add this once authentication is done ->  withAuth
  try {
    const deletePost = await Post.destroy({
      where: {
        post_id: req.params.id,
        //  user_id: req.session.user_id,
      },
    });

    if (!deletePost) {
      res.status(404).json({ message: "No project found with this id!" });
      return;
    }

    res.status(200).json(deletePost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// API route to flag posts innappropriate
router.post("/flag/:id", async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) {
      res.status(404).json({ message: "Post not found" });
      return;
    }

    // Increment the flag_count field by 1
    post.flag_count += 1;
    await post.save();

    res.status(200).json({ message: "Post flagged successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
