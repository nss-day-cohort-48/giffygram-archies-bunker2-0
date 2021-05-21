import { sendPost } from "../data/provider.js";

const mainContainer = document.querySelector(".giffygram");

mainContainer.addEventListener("click", (clickEvent) => {
  if (clickEvent.target.id === "newPost__submit") {
    const postTitle = document.querySelector("input[name='postTitle']").value;
    const postURL = document.querySelector("input[name='postURL']").value;
    const postDescription = document.querySelector(
      "textarea[name='postDescription']"
    ).value;

    const currentUserId = parseInt(localStorage.getItem("gg_user"));

    const sendNewPostToApi = {
      title: postTitle,
      imageURL: postURL,
      description: postDescription,
      userId: currentUserId,
      timestamp: Date.now(),
    };

    sendPost(sendNewPostToApi);
  }
});

export const PostEntry = () => {
  let html = `
  <div class="giffygram__feed">
    <div class="newPost">
    <div>
      <input value="" name="postTitle" class="newPost__input" type="text" placeholder="Title">
    </div>
    <div>
      <input value="" name="postURL" class="newPost__input" type="text" placeholder="URL of gif">
    </div>

    <textarea value="" name="postDescription" class="newPost__input newPost__description" placeholder="Story behind your gif..."></textarea>

    <button id="newPost__submit">Save</button>
    <button id="newPost__cancel">Cancel</button>
    </div>
    </div>

    `;

  return html;
};
