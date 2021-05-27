// --Base URL for JSON SERVER (API)
const apiURL = "http://localhost:8088";

// -- United State of Application --
const applicationState = {
  currentUser: {},
  minimode: true,
  feed: {
    chosenUser: 0,
    displayFavorites: false,
    displayMessage: false,
    displayInbox: false,
    chosenUserProfileId : 0,
    displayProfile: false
  },
  users: [],
  posts: [],
  likes: [],
  messages: [],
  follows: []
};

// set the element we're trying to target 
const applicationElement = document.querySelector(".giffygram");

// -------------------
// -- MAIN FETCH CALLS
// ---------- GET-ters
// --get lists from DB

export const fetchPosts = () => {
  return fetch(`${apiURL}/posts`)
    .then((response) => response.json())
    .then((post) => {
      applicationState.posts = post;
    });
};

export const fetchLikes = () => {
  return fetch(`${apiURL}/likes`)
    .then((response) => response.json())
    .then((like) => {
      applicationState.likes = like;
    });
};

export const fetchMessages = () => {
  return fetch(`${apiURL}/messages`)
    .then((response) => response.json())
    .then((message) => {
      applicationState.messages = message;
    });
};

export const fetchUsers = () => {
  return fetch(`${apiURL}/users`)
    .then((response) => response.json())
    .then((user) => {
      applicationState.users = user;
    });
};

export const fetchFollows = () => {
  return fetch(`${apiURL}/follows`)
    .then((response) => response.json())
    .then((follow) => {
      applicationState.follows = follow;
    });
};
// ---------------------
// -- HELPER FETCH CALLS
// ------------ POST-ers
// -create objects in DB

export const sendPost = (newPost) => {
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPost),
  };
  return fetch(`${apiURL}/posts`, fetchOptions)
    .then((response) => response.json())
    .then(() => {
      applicationElement.dispatchEvent(new CustomEvent("stateChanged"));
    });
};

export const favoritePost = (id) => {
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: parseInt(localStorage.getItem("gg_user")),
      postId: id,
    }),
  };
  return fetch(`${apiURL}/likes`, fetchOptions)
    .then((response) => response.json())
    .then(() => {
      applicationElement.dispatchEvent(new CustomEvent("stateChanged"));
    });
};

export const postNewUser = (userObject) => {
  return fetch(`${apiURL}/users`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(userObject),
  })
    .then((response) => response.json())
    .then(() => {
      applicationElement.dispatchEvent(new CustomEvent("stateChanged"));
    });
};


export const postMessage = (userMessage) => {
  return fetch(`${apiURL}/messages`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(userMessage),
  })
    .then((response) => response.json())
    .then(() => {
      applicationElement.dispatchEvent(new CustomEvent("stateChanged"));
    });
};

export const postFollow = (followObject) => {
  return fetch(`${apiURL}/follows`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(followObject),
  })
    .then((response) => response.json())
    .then(() => {
      applicationElement.dispatchEvent(new CustomEvent("stateChanged"));
    });
};

// -------------------------
// ------ HELPER FETCH CALLS
// --------------- PATCH-ers
// --update properties in DB

export const messageIsRead = (messageId) => {
  return fetch(`${apiURL}/messages/${messageId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ read: true }),
  })
    .then((response) => response.json())
    .then(() => {
      applicationElement.dispatchEvent(new CustomEvent("stateChanged"));
    });
};

export const messageIsUnread = (messageId) => {
  return fetch(`${apiURL}/messages/${messageId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ read: false }),
  })
    .then((response) => response.json())
    .then(() => {
      applicationElement.dispatchEvent(new CustomEvent("stateChanged"));
    });
};

// ------------------------
// ----- HELPER FETCH CALLS
// ------------- DELETE-ers
// --delete objects from DB

export const deletePost = (id) => {
  return fetch(`${apiURL}/posts/${id}`, 
  { method: "DELETE" }).then(() => {
    applicationElement.dispatchEvent(new CustomEvent("stateChanged"));
  });
};

export const removeLikedPost = (id) => {
  return fetch(`${apiURL}/likes/${id}`, 
  { method: "DELETE" }).then(() => {
    applicationElement.dispatchEvent(new CustomEvent("stateChanged"));
  });
};

// ------------------------------------
// ------------------------- GETTERS --
// --get stuff from app state

export const getUsers = () => {
  return [...applicationState.users];
};

export const getPosts = () => {
  return [...applicationState.posts];
};

export const getLikes = () => {
  return [...applicationState.likes];
};

export const getMessages = () => {
  return [...applicationState.messages];
};

export const getFollows = () => {
  return [...applicationState.follows];
};

export const getChosenUser = () => {
  return applicationState.feed.chosenUser
}

export const getMessageDisplayMessage = () => {
  return applicationState.feed.displayMessage;
};

export const getDisplayProfile = () => {
  return applicationState.feed.displayProfile
}

export const getDisplayFavorites = () => {
  return applicationState.feed.displayFavorites
}

export const getChosenUserProfileId = () => {
  return applicationState.feed.chosenUserProfileId
}

export const getInboxDisplay = () => {
  return applicationState.feed.displayInbox;
};

// -------------------------------------
// -------------------------- SETTERS -- 
// ---set property values from app state


export const setChosenUser = (userId) => {
  applicationState.feed.chosenUser = userId
} 

export const setChosenUserProfileId = userId => {
  applicationState.feed.chosenUserProfileId = userId
}

export const setMessageDisplayToTrue = () => {
  applicationState.feed.displayMessage = true;
};

export const setMessageDisplayToFalse = () => {
  applicationState.feed.displayMessage = false;
};

export const setProfileDisplayToTrue = () => {
  applicationState.feed.displayProfile = true
};

export const setProfileDisplayToFalse = () => {
  applicationState.feed.displayProfile = false
}

export const setDisplayFavoritesToTrue = () => {
  applicationState.feed.displayFavorites = true
}

export const setDisplayFavoritesToFalse = () => {
  applicationState.feed.displayFavorites = false
}

export const setInboxDisplayToTrue = () => {
  applicationState.feed.displayInbox = true;
};

export const setInboxDisplayToFalse = () => {
  applicationState.feed.displayInbox = false;
};

export const setInboxDisplay = (boolean) => {
  applicationState.feed.displayInbox = boolean
}

