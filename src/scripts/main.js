import { GiffyGram } from "./GiffyGram.js";
import { LoginForm } from "./auth/Login.js";
import {
  fetchLikes,
  fetchMessages,
  fetchPosts,
  fetchUsers,
} from "./data/provider.js";
import { Register } from "./auth/Register.js";

const applicationElement = document.querySelector(".giffygram");

export const renderApp = () => {
  const user = parseInt(localStorage.getItem("gg_user"));

  const newUser = localStorage.getItem("gg_newUser");

  fetchUsers()
    .then(fetchMessages)
    .then(fetchPosts)
    .then(fetchLikes)
    .then(() => {
      if (user) {
        applicationElement.innerHTML = GiffyGram();
      } else if (newUser) {
        applicationElement.innerHTML = Register();
      } else {
        applicationElement.innerHTML = LoginForm();
      }
    });
};

renderApp();

applicationElement.addEventListener("stateChanged", (customEvent) => {
  renderApp();
});
