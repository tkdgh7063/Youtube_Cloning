const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const comments = document.querySelectorAll(".video__comments li");
const deleteBtn = document.querySelectorAll(".video__comments li button");

// for future features
// change comments number in real-time when adding or deleting comments
// modifying comments
// like on comments
// cancel like
// find videos with hashtag click

const addComment = (text, id) => {
  const videoComments = document.querySelector(".video__comments ul");
  const newComment = document.createElement("li");
  newComment.dataset.id = id;
  newComment.className = "video__comment";
  // when add css
  // newComment.className = "video__comment";
  // const icon = document.createElement("i");
  // icon.className = "fas fa-comment";
  const span = document.createElement("span");
  span.innerText = ` ${text}`;
  const btn = document.createElement("button");
  btn.innerText = "❌";
  btn.style = "padding: 0;";
  btn.addEventListener("click", handleDeleteComment);
  // newComment.appendChild(icon);
  newComment.appendChild(span);
  newComment.appendChild(btn);
  videoComments.prepend(newComment);
};

const handleSubmit = async (e) => {
  e.preventDefault();
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  const videoId = videoContainer.dataset.id;
  if (text === "") {
    return;
  }
  const response = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  if (response.status === 201) {
    // create fake comment
    textarea.value = "";
    const { newCommentId } = await response.json();
    addComment(text, newCommentId);
  }
};

const handleDeleteComment = async (e) => {
  const {
    dataset: { id },
  } = e.target.parentElement;
  const videoId = videoContainer.dataset.id;

  const response = await fetch(`/api/videos/${videoId}/comment/${id}/delete`, {
    method: "POST",
  });
  if (response.status === 200) {
    // delete fake comment
    e.target.parentElement.remove();
  }
};

if (form) {
  form.addEventListener("submit", handleSubmit);
  deleteBtn.forEach((element) => {
    element.addEventListener("click", handleDeleteComment);
  });
}
