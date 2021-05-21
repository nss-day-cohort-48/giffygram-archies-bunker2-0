import { sendPost } from "../data/provider.js";

TODO: var miniMode = true;

const mainContainer = document.querySelector(".giffygram");

// this event listener allows miniMode to "open"
TODO: document.addEventListener("click", (clickEvent) => {
  if (clickEvent.target.id === "miniMode") {
    miniMode = false;
    mainContainer.dispatchEvent(new CustomEvent("stateChanged"));
  }
});
// this event listener allows miniMode to "close"
TODO: document.addEventListener("click", (clickEvent) => {
  if (clickEvent.target.id === "newPost__cancel") {
    miniMode = true;
    mainContainer.dispatchEvent(new CustomEvent("stateChanged"));
  }
});

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
  TODO: if (miniMode) {
    return `
        <div class="postEntry">
            <div class="miniMode" id="miniMode">Have a gif to post?
            </div>
        </div>`;
  } else {
    return `
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
  }
};
