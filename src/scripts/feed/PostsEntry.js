import { sendPost } from "../data/provider.js";

var miniMode = true;

const applicationElement = document.querySelector(".giffygram");

// this event listener allows miniMode to "open"
document.addEventListener("click", (clickEvent) => {
  if (clickEvent.target.id === "miniMode") {
    miniMode = false;
    applicationElement.dispatchEvent(new CustomEvent("stateChanged"));
  }
});
// this event listener allows miniMode to "close"
document.addEventListener("click", (clickEvent) => {
  if (clickEvent.target.id === "newPost__cancel") {
    miniMode = true;
    applicationElement.dispatchEvent(new CustomEvent("stateChanged"));
  }
});
// this event listener submits a new post
applicationElement.addEventListener("click", (clickEvent) => {
  if (clickEvent.target.id === "newPost__submit") {
    //get the values from the form
    const postTitle = document.querySelector("input[name='postTitle']").value;
    const postURL = document.querySelector("input[name='postURL']").value;
    const postDescription = document.querySelector(
      "textarea[name='postDescription']"
    ).value;
    //set miniMode back to true
    miniMode = true;
    applicationElement.dispatchEvent(new CustomEvent("stateChanged"));

    const currentUserId = parseInt(localStorage.getItem("gg_user"));

    const sendNewPostToApi = {
      title: postTitle,
      imageURL: postURL,
      description: postDescription,
      userId: currentUserId,
      timestamp: Date.now(),
    };
    //Post to API
    sendPost(sendNewPostToApi);
  }
});

//HTML for the Post Entry Form
export const PostEntry = () => {
  if (miniMode) {
    return `
        <div class="miniMode" id="miniMode">Have a gif to post?</div>`;
  } else {
    return `
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
    

    `;
  }
};
