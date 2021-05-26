import { GiffyGram } from "./GiffyGram.js";
import { LoginForm } from "./auth/Login.js";
import {
  fetchFollows,
  fetchLikes,
  fetchMessages,
  fetchPosts,
  fetchUsers,
} from "./data/provider.js";
import { Register } from "./auth/Register.js";

// selecting the HTML element by class where we're wanting to render
const applicationElement = document.querySelector(".giffygram");

// create a function that renders the HTML for the app
export const renderApp = () => {
  
  //grab the current logged in user from localStorage
  const currentUserId = parseInt(localStorage.getItem("gg_user"));

  //grab the newUser from localStorage 
  const newUser = localStorage.getItem("gg_newUser");

  //fetch Users from the API and put the list in the App State
  fetchUsers()
    //then fetch Messages from the API and put the list in the App State
      //--define the function, not invoke it
      .then(fetchMessages)
      //then fetch Posts from the API and put the list in the App State
      //--define the function, not invoke it
      .then(fetchPosts)
      //then fetch Likes from the API and put the list in the App State
      //--define the function, not invoke it
    .then(fetchLikes)
    .then(fetchFollows)
    //then display the HTML depending on certain conditions
    .then(() => {
      //if a current user is valid and logged in
      if (currentUserId) {
        //set the inner HTML of the element equal to the App's main page
        applicationElement.innerHTML = GiffyGram();
        //otherwise if the user is new
      } else if (newUser) {      
        //set the inner HTML of the element equal to the App's registration page
        applicationElement.innerHTML = Register();
        //otherwise the user isn't new or logged in
      } else {
        //set the inner HTML of the element equal to the App's login page
        applicationElement.innerHTML = LoginForm();
      }
    });
};
//render that app
renderApp();

//a custom event listener that tells the app that the app state has changed and to rerender
applicationElement.addEventListener("stateChanged", (customEvent) => {
  renderApp();
});
