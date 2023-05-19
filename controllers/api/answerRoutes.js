const router = require("express").Router();
const { Answer } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", async (req, res) => {
  // missing withAuth
  try {
    const newAnswer = await Answer.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newAnswer);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const answerData = await Answer.destroy({
      where: {
        answer_id: req.params.id,
        //user_id: req.session.user_id,
      },
    });

    if (!answerData) {
      res.status(404).json({ message: "No answer found with this id!" });
      return;
    }

    res.status(200).json(answerData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
