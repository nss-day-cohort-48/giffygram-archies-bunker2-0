import { getLikes, getPosts } from "../data/provider.js";

export const PostList = () => {
  const posts = getPosts();
  const likes = getLikes();
  let html = `
  <section class="post">
  ${posts
    .map((post) => {
      return `
        <header>
            <h2 class="post__title">${post.title}</h2>
        </header>
        <img class="post__image" src="${post.imageURL}">
        <div class="post__description">${post.description}</div>
        <div class="post__tagline">Posted by 
            <a href="#" class="profileLink" id="profile--"</a>
            on ${post.timestamp}
        </div>
        <div>
            <div>
                <img id="favoritePost--4" class="actionIcon" src="/images/favorite-star-blank.svg">
            </div>
        </div>
      `;
    })
    .join("")}
  </section>
  `;
  return html;
};
