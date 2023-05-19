const flagPostBtnEl = document.querySelectorAll(".flag-post-btn");

flagPostBtnEl.forEach((btn) => {
  btn.addEventListener("click", async () => {
    const postId = btn.dataset.postId;
    try {
      console.log(postId);
      await fetch(`/api/posts/flag/${postId}`, {
        method: "POST",
      });
      // Reload page after deleting answer.
      document.location.reload();
      //console.log(postId);
    } catch (err) {
      console.error(err);
    }
  });
});
