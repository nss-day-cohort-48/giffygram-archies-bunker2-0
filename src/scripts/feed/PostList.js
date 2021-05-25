import {
  getLikes,
  getPosts,
  getUsers,
  getChosenUser,
  favoritePost,
  deletePost,
} from "../data/provider.js";

// export const PostList = () => {
//   const posts = getPosts();
//   posts.sort((post1, post2) => (post1.timestamp < post2.timestamp ? 1 : -1));
//   const likes = getLikes();
//   const users = getUsers();
//   let html = ``
//   html += `
//   ${posts
//     .map((post) => {
//       return `

//       <section class="post">
//         <header>
//             <h2 class="post__title">${post.title}</h2>
//         </header>

//         <img class="post__image" src="${post.imageURL}">

//         <div class="post__description">
//         ${post.description}
//         </div>

//         <div class="post__tagline">
//             Posted by
//             <a href="#" class="profileLink" id="profile--${post.userId}">
//             ${users.find((user) => user.id === post.userId).name}
//            </a>

//             on ${new Date(post.timestamp).toLocaleDateString("en-US")}
//         </div>

//         <div class="post__actions">
//             <div>
//                 <img id="favoritePost--${post.id}" class="actionIcon" src="/images/favorite-star-blank.svg">
//             </div>
//         </div>
//       </section>

//       `;
//     })
//     .join("")}`

//   ;
//   return html;
// };

document.addEventListener("click", (eventClicked) => {
  if (eventClicked.target.id.startsWith("blockPost--")) {
    const [, postId] = eventClicked.target.id.split("--");
    deletePost(parseInt(postId));
  }
});

document.addEventListener("click", (eventClicked) => {
  if (eventClicked.target.id.startsWith("favoritePost--")) {
    const [, postId] = eventClicked.target.id.split("--");
    favoritePost(parseInt(postId));
  }
});

export const PostList = () => {
  const posts = getPosts();
  const users = getUsers();
  const chosenUserId = getChosenUser();
  posts.sort((post1, post2) => (post1.timestamp < post2.timestamp ? 1 : -1));
  const userId = parseInt(localStorage.getItem("gg_user"));
  const likes = getLikes();

  const usersLikes = likes.filter((likeObject) => {
    return userId === likeObject.userId;
  });

  let displayedPosts = [];

  if (chosenUserId === 0) {
    displayedPosts = posts;
  } else {
    const filteredPosts = posts.filter(
      (post) => post.userId === parseInt(chosenUserId)
    );
    filteredPosts.sort((post1, post2) =>
      post1.timestamp < post2.timestamp ? 1 : -1
    );
    displayedPosts = filteredPosts;
  }

  let html = `

  ${displayedPosts
    .map((post) => {
      const foundLike = usersLikes.find((userLiked) => {
        return userLiked.postId === post.id;
      });

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
            <a href="#" class="profileLink" id="profile--${post.userId}">
            ${users.find((user) => user.id === post.userId).name}
           </a>
        
            on ${new Date(post.timestamp).toLocaleDateString("en-US")}
        </div>

        <div class="post__actions">
            <div>
                <img id="favoritePost--${
                  post.id
                }" class="actionIcon" src="/images/favorite-star-${
        foundLike ? "yellow" : "blank"
      }.svg">
            </div>
            <div>
            <img id="blockPost--${
              post.id
            }" class="actionIcon" src="/images/block.svg">
        </div>
        </div>
        </section>
        
        
      `;
    })
    .join("")}`;

  return html;
};
