// TODO: add a sendPostToApi function in provider.js, create an event listener in this module

import { sendPost } from "../data/provider.js";

mainContainer.addEventListener("click", (clickEvent) => {
  if (clickEvent.target.id === "newPost__submit") {
    // Get what the user typed into the form fields
    const userDescription = document.querySelector(
      "input[name='serviceDescription']"
    ).value;
    const postTitle = document.querySelector("input[name='postTitle']").value;
    const postURL = document.querySelector("input[name='postURL']").value;
    const postDescription = document.querySelector(
      "input[name='postDescription']"
    ).value;

    const sendNewPostToApi = {
      title: postTitle,
      imageURL: postURL,
      postDescription: postDescription,
      timestamp: Date.now(),
    };

    sendPost(sendNewPostToApi);
  }
});

export const PostEntry = () => {
  return `
  <div class="giffygram__feed">
  <div class="newPost">
  <div>
      <input value="" name="postTitle" class="newPost__input" type="text" placeholder="Title">
  </div>
  <div>
      <input value="" name="postURL" class="newPost__input" type="text" placeholder="URL of gif">
  </div>

  <textarea name="postDescription" class="newPost__input newPost__description" placeholder="Story behind your gif..."></textarea>

  <button id="newPost__submit">Save</button>
  <button id="newPost__cancel">Cancel</button>
</div>
</div>
    `;
};
