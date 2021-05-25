import { getPosts, getLikes, getUsers} from "../data/provider.js";

export const FavoriteList = () => {
    const posts = getPosts();
    posts.sort((post1, post2) => (post1.timestamp < post2.timestamp ? 1 : -1));
    const userId = parseInt(localStorage.getItem("gg_user"));
    const likes = getLikes();
    const users = getUsers()
  
//     const usersLikes = likes.filter((likeObject) => {
//         return userId === likeObject.userId;
// });

let foundLikedPosts = []

for (const like of likes) {
    if(like.userId === userId) {
        for (const post of posts) {
            if (post.id === like.postId) {
                foundLikedPosts.push(post)
            }
        }
    }
}

const usersLikes = likes.filter((likeObject) => {
    return userId === likeObject.userId 
});


      
    let sortedLikedPosts = foundLikedPosts.sort((post1, post2) => {post1.timestamp < post2.timestamp ? 1 : -1})
     
  
    let html = `
  
    ${sortedLikedPosts
      .map((post) => {
        const foundLikedPost = usersLikes.find((userLiked) => {
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
          foundLikedPost ? "yellow" : "blank"
        }.svg">
              </div>
              <div>
            ${
              post.userId === userId
                ? `<img id="blockPost--${post.id}" class="actionIcon" src="/images/block.svg" />`
                : ""
            }
        </div>
          </div>
          </section>
          
          
        `;
      })
      .join("")}`;
  
    return html;
  };
  