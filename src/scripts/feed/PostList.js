import { getLikes, getPosts } from "../data/provider.js";

export const PostList = () => {
  const posts = getPosts();
  const likes = getLikes();
  let html = `
  <div class="">
  ${posts
    .map((post) => {
      return `
      <section class="post">
      <header>
      <h2 class="post__title">${post.title}</h2>
      </header>
      <img class="post__image" src="${post.imageURL}">
      <div class="post__description">${post.description}</div>
      <div class="post__tagline">Posted by 
      <a href="#" class="profileLink" id="profile--"</a>
      on ${post.timestamp}
      </div>
      `;
    })
    .join("")}
  </div>
  `;
  return html;
};
