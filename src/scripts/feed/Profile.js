import {
	getChosenUserProfileId,
	getPosts,
	getUsers,
	getLikes,
	getFollows,
	postFollow
} from "../data/provider.js";

const applicationElement = document.querySelector(".giffygram")
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

document.addEventListener("click", e => {
	if (e.target.id === "followingButton") {
		showFollowing()
	}
})

document.addEventListener("click", e => {
	if (e.target.id === "followersButton") {
		showFollowers()
	}
})

document.addEventListener("click", e => {
	if (e.target.id === "postButton") {
		showPosts()
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
	const userPic = users.find((user) => user.id === chosenUserId).imageURL;

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

	let isCurrentUserFollowing = false

	for (const follower of followersOfChosenUser) {
		if (follower.id === currentUserId) {
			isCurrentUserFollowing = true
		}
	}


	let isCurrentUser = false 

	if (chosenUserId === currentUserId) {
		isCurrentUser = true
	}

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

{/* <div>
								<h3 class="profile__postCount">Is Following:</h3>
								${chosenUserIsFollowing.map((followee) => {
									return `${followee.name}`
								})}
							</div>
							*/}

	let html = `<div class="profile__main-flex profile__postCount">
							<div class="profile__main-flex-inner">
							<img src="${userPic}" alt="photo of ${userName}">
							<h1 class="">${userName}</h1>
							</div>
							<div class="profile__main-flex-inner">
							<button class="profile__button fakeLink" id="followingButton">Following: ${chosenUserIsFollowing.length}</button>
							<button class="profile__button fakeLink" id="followersButton">Followers: ${followersOfChosenUser.length}</button>
							<button class="profile__button fakeLink" id="follow--${chosenUserId}" ${isCurrentUserFollowing || isCurrentUser ? "disabled" : ""}>Follow ${userName}</button>
							</div>
							</div>
							<div id="profileFollowers" class="profileFollowers">
								<ul class="profile__postCount">
									<h1>Followers:</h1> 
										${followersOfChosenUser.map((follower) => {
											return `<li><button class="fakeLink" id="profile--${follower.id}">${follower.name}</button></li>`
										}).join("")}
								</ul>
							</div> 
							<div id="profileFollowing" class="profileFollowing">
								<ul class="profile__postCount">
									<h1 class="profile__postCount">Following:</h1>
										${chosenUserIsFollowing.map((followee) => {
											return `<li><button class="fakeLink" id="profile--${followee.id}">${followee.name}</button></li>`
										}).join("")}
								</ul>
							</div>
							<div>
							 <h1 class="profile__postCount">Posts: ${displayedPosts.length}</h1>
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
								}).join("")}
								</div>
								`
 

  
    
  return html;
};

const followersOn = false
const followingOn = false

const showFollowing = () => {

	const div = document.getElementById("profileFollowing")

	if (followersOn) {
		div.classList.toggle("profileFollowers")
	// 	//div.classList.toggle("profileFollowing")
	} else {
		div.classList.toggle("profileFollowing")
	  	followingOn = true
}
}

const showFollowers = () => {
	const div = document.getElementById("profileFollowers")
	
	if (followingOn) {
		div.classList.toggle("profileFollowers")
	// 	//div.classList.toggle("profileFollowing")
	} else {
		div.classList.toggle("profileFollowers")
			followingOn = true
	}
	
}

const showPosts = () => {
	document.getElementById("postsButton")

}

