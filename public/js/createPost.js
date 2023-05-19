const newPostFormHandler = async function (event) {
  event.preventDefault();

  const post_title = document.querySelector('input[name="post_title"]').value;
  const post_body = document.querySelector('textarea[name="post_body"]').value;
  const tag_id = document.getElementById("tag-select").value;

  console.log(post_title, post_body, tag_id);
  try {
    const response = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({
        post_title,
        post_body,
        tag_id,
      }),

      headers: {
        "Content-Type": "application/json",
      },
    });
    const newPost = await response.json();
    document.location.replace(`/posts/${newPost.post_id}`);
  } catch (err) {
    console.error(err);
  }
};

document.querySelector("form").addEventListener("submit", newPostFormHandler);
