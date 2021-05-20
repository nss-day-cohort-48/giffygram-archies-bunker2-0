import { getLikes, getPosts, getUsers } from "../data/provider.js";

export const PostList = () => {
  const posts = getPosts();
  const likes = getLikes();
  const users = getUsers();
  let html = `
  <div class="giffygram__feed">
  ${posts
    .map((post) => {
      return `
        <section class="post">
        <header>
            <h2 class="post__title">${post.title}</h2>
        </header>

        <img class="post__image" src="${post.imageURL}">

        <div class="post__description">
        ${post.description}
        </div>

        <div class="post__tagline">
            Posted by
            <a href="#" class="profileLink" id="profile--2">
            ${users.find((user) => user.id === post.userId).name}
           </a>
        
            on ${new Date(post.timestamp).toLocaleDateString("en-US")}
        </div>

        <div class="post__actions">
            <div>
                <img id="favoritePost--4" class="actionIcon" src="/images/favorite-star-blank.svg">
            </div>
        </div>
        
        </section>
      `;
    })
    .join("")}
    </div>
  `;
  return html;
};
