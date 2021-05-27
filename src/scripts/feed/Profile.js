import {
	getChosenUserProfileId,
	getPosts,
	getUsers,
	getLikes,
	getFollows,
	postFollow
} from "../data/provider.js";


document.addEventListener("click", clickEvent => {
	if (clickEvent.target.id.startsWith("follow--")) {
		const [, followingId] = clickEvent.target.id.split("--")
		const currentUserId = parseInt(localStorage.getItem("gg_user"));

		const followObject = {
			followingId: parseInt(followingId),
			userId: currentUserId
		}

		postFollow(followObject)

	}
})


export const Profile = () => {
	const users = getUsers();
	const posts = getPosts();
	const likes = getLikes();
	const follows = getFollows()
	const chosenUserId = getChosenUserProfileId();
	const currentUserId = parseInt(localStorage.getItem("gg_user"));

	const userName = users.find((user) => user.id === chosenUserId).name;

	const usersLikes = likes.filter((likeObject) => {
		return currentUserId === likeObject.userId;
	});

  let chosenUserIsFollowing = []

	follows.filter((follow) => {
		if (follow.userId === chosenUserId) {
			users.filter((user) => {
				if (user.id === follow.followingId) {
					chosenUserIsFollowing.push(user)
				}
			})
		} 
	})

	let followersOfChosenUser = []

	follows.filter((follow) => {
		if (follow.followingId === chosenUserId) {
			users.filter((user) => {
				if (user.id === follow.userId) {
					followersOfChosenUser.push(user)
				}
			})
		} 
	})

	let displayedPosts = [];

	if (chosenUserId === 0) {
		displayedPosts = posts;
	} else {
		const filteredPosts = posts.filter(
			(post) => post.userId === parseInt(chosenUserId));
		filteredPosts.sort(
			(post1, post2) => (post1.timestamp < post2.timestamp ? 1 : -1));
		displayedPosts = filteredPosts;
	}

	let html = `<h1 class="profile__title">${userName}</h1>
              <h3 class="profile__postCount">Total Post Count: ${displayedPosts.length}</h3>
							<h3 class="profile__postCount">Is Following: ${chosenUserIsFollowing.map((followee) => {
								return `${followee.name}`
							})}</h3>
							<h3 class="profile__postCount">Followers: ${followersOfChosenUser.map((follower) => {
								return `${follower.name}`
							})}</h3>
							<button class="profile__postCount" id="follow--${chosenUserId}">Follow</button>


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
