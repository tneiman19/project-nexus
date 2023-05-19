// Add new answer
const newAnswerHandler = async function (event) {
  event.preventDefault();
  const answer_body = document.querySelector(
    'textarea[name="answer-body"]'
  ).value;

  const postId = document.getElementById("post-id").value;
  try {
    const response = await fetch("/api/answers", {
      method: "POST",
      body: JSON.stringify({
        answer_body,
        post_id: postId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    // Reload page after adding new answer.
    document.location.reload();
  } catch (err) {
    console.error(err);
  }
};
document.addEventListener("submit", newAnswerHandler);

// Delete Answers
const deleteBtns = document.querySelectorAll(".btn-delete");
deleteBtns.forEach((btn) => {
  btn.addEventListener("click", async () => {
    const answerId = btn.dataset.answerId;
    try {
      //console.log(answerId);
      await fetch(`/api/answers/${answerId}`, {
        method: "DELETE",
      });
      // Reload page after deleting answer.
      document.location.reload();
    } catch (err) {
      console.error(err);
    }
  });
});
