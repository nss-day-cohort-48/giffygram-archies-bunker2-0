const apiURL = "http://localhost:8088";

const applicationState = {
  currentUser: {},
  minimode: true,
  feed: {
    chosenUser: 0,
    displayFavorites: false,
    displayMessage: false,
    displayInbox: false,
  },
  users: [],
  posts: [],
  likes: [],
  messages: [],
};

const mainContainer = document.querySelector(".giffygram");

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
      mainContainer.dispatchEvent(new CustomEvent("stateChanged"));
    });
};

export const getChosenUser = () => {
  return applicationState.feed.chosenUser
}

export const getMessageDisplayMessage = () => {
  return applicationState.feed.displayMessage;
};
export const setMessageDisplayToTrue = () => {
  applicationState.feed.displayMessage = true;
};

export const setMessageDisplayToFalse = () => {
  applicationState.feed.displayMessage = false;
};

export const setChosenUser = (userId) => {
  applicationState.feed.chosenUser = userId
} 

export const getInboxDisplay = () => {
  return applicationState.feed.displayInbox;
};
export const setInboxDisplayToTrue = () => {
  applicationState.feed.displayInbox = true;
};

export const setInboxDisplayToFalse = () => {
  applicationState.feed.displayInbox = false;
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
      mainContainer.dispatchEvent(new CustomEvent("stateChanged"));
    });
};

export const removeLikedPost = (id) => {
  return fetch(`${apiURL}/likes/${id}`, { method: "DELETE" }).then(() => {
    mainContainer.dispatchEvent(new CustomEvent("stateChanged"));
  });
};

export const fetchUsers = () => {
  return fetch(`${apiURL}/users`)
    .then((response) => response.json())
    .then((user) => {
      console.log("users fetched")
      applicationState.users = user;
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
      mainContainer.dispatchEvent(new CustomEvent("stateChanged"));
    });
};

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
      mainContainer.dispatchEvent(new CustomEvent("stateChanged"));
    });
};

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
      mainContainer.dispatchEvent(new CustomEvent("stateChanged"));
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
      mainContainer.dispatchEvent(new CustomEvent("stateChanged"));
    });
};

export const deletePost = (id) => {
  return fetch(`${apiURL}/posts/${id}`, { method: "DELETE" }).then(() => {
    mainContainer.dispatchEvent(new CustomEvent("stateChanged"));
  });
};

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
