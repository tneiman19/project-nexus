// Delete Post
const deletePostBtns = document.querySelectorAll(".post-btn-delete");
deletePostBtns.forEach((btn) => {
  btn.addEventListener("click", async () => {
    const postId = btn.dataset.postId;
    try {
      console.log(postId);
      await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
      });
      // Reload page after deleting answer.
      document.location.reload();
    } catch (err) {
      console.error(err);
    }
  });
});
