import {
  getLikes,
  getPosts,
  getUsers,
  getChosenUser,
  favoritePost,
  deletePost,
  removeLikedPost,
  setChosenUserProfileId,
  setProfileDisplayToTrue,
  setMessageDisplayToFalse,
  setDisplayFavoritesToFalse,
} from "../data/provider.js";

const applicationElement = document.querySelector(".giffygram")
//click event on Trash Can to delete a post
document.addEventListener("click", (eventClicked) => {
  if (eventClicked.target.id.startsWith("blockPost--")) {
    const [, postId] = eventClicked.target.id.split("--");
    deletePost(parseInt(postId));
  }
});

//click event on the Favorites Icon (STAR)
document.addEventListener("click", clickEvent => {
  const likes = getLikes()
  if(clickEvent.target.id.startsWith("favoritePost")) {
    const [, favoritePostId] = clickEvent.target.id.split("--")
    const favoritePostIdInt = parseInt(favoritePostId)
    const currentUserId = parseInt(localStorage.getItem("gg_user"));
    const usersLikes = likes.filter((likeObject) => {
      return currentUserId === likeObject.userId;
    });
      const foundPostLike = usersLikes.find(like => like.postId === favoritePostIdInt)
      if(foundPostLike) {
        removeLikedPost(foundPostLike.id)
      } else {
        favoritePost(favoritePostIdInt)
      }
  }
})

//click event on the User Profile Link
document.addEventListener("click", clickEvent => {
  if (clickEvent.target.id.startsWith("profile--")) {
    const [, userId] = clickEvent.target.id.split("--")
    setChosenUserProfileId(parseInt(userId))
    setProfileDisplayToTrue()
    setDisplayFavoritesToFalse()

    applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
  }
})

//provides HTML for all the posts
export const PostList = () => {
  const posts = getPosts();
  const users = getUsers();
  const chosenUserId = getChosenUser();
  posts.sort((post1, post2) => (post1.timestamp < post2.timestamp ? 1 : -1));
  const currentUserId = parseInt(localStorage.getItem("gg_user"));
  const likes = getLikes();

  const currentUserLikes = likes.filter((likeObject) => {
    return currentUserId === likeObject.userId;
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
      const foundLike = currentUserLikes.find((userLiked) => {
        return userLiked.postId === post.id;
      });

      return `
      
      <section class="post">
        <header>
            <h2 class="post__title">${post.title}</h2>
        </header>
        <img class="post__image" src="${post.imageURL}">
        <div class="post__description">${post.description}</div>
        <div class="post__tagline">
            Posted by
            <button class="fakeLink" id="profile--${post.userId}">
              ${users.find((user) => user.id === post.userId).name}
            </button>   
            on ${new Date(post.timestamp).toLocaleDateString("en-US")}
        </div>
        <div class="post__actions">
            <div>
                <img id="favoritePost--${post.id}" 
                class="actionIcon" 
                src="/images/favorite-star-${foundLike ? "yellow" : "blank"}.svg">
            </div>
            <div>
            ${post.userId === currentUserId ? 
              `<img id="blockPost--${post.id}" class="actionIcon" src="/images/block.svg" />`
              : ""}
            </div>
        </div>
      </section>`;
    }).join("")}`;

  return html;
};

