import { getPosts, getLikes, getUsers} from "../data/provider.js";

export const FavoriteList = () => {
    // get the posts list from app state
    const posts = getPosts();
    // sort the posts list in descending order
    posts.sort((post1, post2) => (post1.timestamp < post2.timestamp ? 1 : -1));
    // get the current userID
    const currentUserId = parseInt(localStorage.getItem("gg_user"));
    // get the likes list from app state
    const likes = getLikes();
    // get the users list from app state
    const users = getUsers()

    // declare a variable to store the list of found liked posts
    let foundLikedPostsOfCurrentUser = []


    //iterate through the list of liked posts
    for (const like of likes) {
        //if the user Id of the current liked post equals the id of current user
        if (like.userId === currentUserId) {
            //iterate through the list of posts
            for (const post of posts) {
                //if the id of the current post equals the postId of the current liked post
                if (post.id === like.postId) {
                    //add the current post to the storage variable
                    foundLikedPostsOfCurrentUser.push(post)
                }
            }
        }
    }
    // filter the liked posts that have the id of the current user
    const currentUserLikes = likes.filter((likeObject) => {
        return currentUserId === likeObject.userId 
    });
    

    //sort the found liked posts in descending order by epoch time
    let sortedLikedPosts = foundLikedPostsOfCurrentUser.sort((post1, post2) => post2.timestamp - post1.timestamp)
     
    //generate some HTML
    let html = `
  
    ${sortedLikedPosts
      //map through the sortedLiked Posts
      .map((post) => {
        //to find the current user's liked post
        const foundLikedPost = 
          currentUserLikes.find(userLiked => userLiked.postId === post.id);
  
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
                    src="/images/favorite-star-${foundLikedPost ? "yellow" : "blank"}.svg">
              </div>
              <div>${post.userId === currentUserId ? 
                `<img id="blockPost--${post.id}" class="actionIcon" src="/images/block.svg" />`
                : "" }
              </div>
          </div>
        </section>`
      }).join("")}`;
  
    return html;
  };
  